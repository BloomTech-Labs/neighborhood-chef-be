#!/bin/bash

### Helfpul Articles
# https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly
# https://github.com/docker-library/postgres/issues/435#issuecomment-615083213
# https://hackernoon.com/dont-install-postgres-docker-pull-postgres-bee20e200198
# https://hub.docker.com/_/postgres
# https://chartio.com/resources/tutorials/how-to-set-the-default-user-password-in-postgresql/
# https://chartio.com/resources/tutorials/how-to-change-a-user-to-superuser-in-postgresql/

container=postgres
requirements="docker;psql;knex"   #;docker-compose


#region Helper Functions
print_usage() {
  echo This script attempts to download a PostgreSQL image from the official Docker Hub repository and configure it for use as a local development instance for the Neighborhood Chef back-end.
  echo
  echo Please contact the current developers/maintainers with any questions.
  echo
}

fetch_env_value() {
  echo "$(grep $1 ../src/.env | cut -d '=' -f 2)"
}

split() {
  local string="$1"
  local delimiter="$2"
  if [ -n "$string" ]; then
    local part
    while read -d "$delimiter" part; do
      echo $part
    done <<< "$string"
    echo $part
  fi
}

test_uname() {
  unameOut="$(uname -s)"
  case "${unameOut}" in
    Linux*)     machine="Linux";;
    Darwin*)    machine="Mac";;
    CYGWIN*)    machine="Cygwin";;
    MINGW*)     machine="MinGw";;
    *)          machine="UNKNOWN:${unameOut}"
  esac
  echo ${machine}
}

test_ostype() {
  if [[ "$OSTYPE" == "linux-gnu" ]]; then
    echo "OS/Env Type: Linux"
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "OS/Env Type: Mac OSX"
  elif [[ "$OSTYPE" == "cygwin" ]]; then
    echo "OS/Env Type: Cygwin"
  elif [[ "$OSTYPE" == "msys" ]]; then
    echo "OS/Env Type: MinGW"
  elif [[ "$OSTYPE" == "win32" ]]; then
    echo "OS/Env Type: Win32" #(though this should not happen)
  elif [[ "$OSTYPE" == "freebsd"* ]]; then
    echo "OS/Env Type: FreeBSD"
  else
    echo "OS/Env Type: Unknown"
  fi
}

test_wsl() {
  # set -e
  if grep -qEi "(Microsoft|WSL)" /proc/version &> /dev/null ; then
      echo "Windows 10 WSL Bash"
  fi
}

test_sudo() {
  u=$(test_uname)

  if [ "$u" == "Linux" ] || [ "$u" == "Mac" ]; then
    echo 1
  else
    echo 0
  fi
}

runtime_full_path() {
  d=$(dirs)
  p=${d/\~/$HOME}
  echo "$p"
}

runtime_root_path() {
  d=$(runtime_full_path)
  # x=${d:0:(-5)}
  x=${d:0:${#d}-5}
  echo "$x"
}

runtime_file_name() {
  f=`basename "$0"`
  echo "$f"
}

runtime_full_path_with_file_name() {
  p=$(runtime_full_path)
  f=$(runtime_file_name)
  echo "File: $p/$f"
  echo
}

confirm_in_data_dir() {
  d=$(runtime_full_path)
  l=`expr length $d`
  x=${d:(($l-4)):4}
  if [ "$x" != "data" ]; then
    echo -e "\nERROR: Wrong runtime path\n\nPlease ensure you are running this script from the data subdirectory.\n\nExample:\n\ncd data\n./postgres-docker.bash\n"
    exit 1
  fi
}

pushd() {
  command pushd "$@" > /dev/null
}

popd() {
  command popd "$@" > /dev/null
}

get_username() {
  local u=$USER
  local un=$USERNAME

  if [ -n "$u" ]; then
    # echo -e "User: $USER"
    echo $u
  else
    if [ -n "$un" ]; then
      # echo -e "Username: $USERNAME"
      echo $un
    else
      echo -e "Unable to determine Username! Cannot continue."
      exit 1
    fi
  fi
}
#endregion Helper Functions

#region Functions
test_for_requirements() {
  missingRequirement=0

  for requirement in $(split "$requirements" ';'); do
    command -v $requirement >/dev/null 2>&1 || { echo >&2 "Program '$requirement' is required, but not installed."; missingRequirement=1; }
  done

  if ((missingRequirement)); then
    echo
    print_usage
    exit 1
  fi
}

populate_variables() {
  POSTGRES_CONNECTION_STRING=$(fetch_env_value POSTGRES_CONNECTION_STRING)
  echo -e "POSTGRES_CONNECTION_STRING:\t$POSTGRES_CONNECTION_STRING"

  echo

  POSTGRES_ADMIN_USER=$(fetch_env_value POSTGRES_ADMIN_USER)
  echo -e "POSTGRES_ADMIN_USER:\t\t$POSTGRES_ADMIN_USER"

  POSTGRES_ADMIN_PASSWORD=$(fetch_env_value POSTGRES_ADMIN_PASSWORD)
  echo -e "POSTGRES_ADMIN_PASSWORD:\t$POSTGRES_ADMIN_PASSWORD"

  echo

  POSTGRES_USER=$(fetch_env_value POSTGRES_USER)
  echo -e "POSTGRES_USER:\t\t\t$POSTGRES_USER"

  POSTGRES_PASSWORD=$(fetch_env_value POSTGRES_PASSWORD)
  echo -e "POSTGRES_PASSWORD:\t\t$POSTGRES_PASSWORD"

  echo

  POSTGRES_DATA_PATH="$(fetch_env_value POSTGRES_DATA_PATH)"
  echo -e "POSTGRES_DATA_PATH:\t\t$POSTGRES_DATA_PATH"

  POSTGRES_INIT_SCRIPTS_PATH=$(fetch_env_value POSTGRES_INIT_SCRIPTS_PATH)
  echo -e "POSTGRES_INIT_SCRIPTS_PATH:\t$POSTGRES_INIT_SCRIPTS_PATH"

  POSTGRES_HOSTNAME=$(fetch_env_value POSTGRES_HOSTNAME)
  echo -e "POSTGRES_HOSTNAME:\t\t$POSTGRES_HOSTNAME"

  POSTGRES_PORT=$(fetch_env_value POSTGRES_PORT)
  echo -e "POSTGRES_PORT:\t\t\t$POSTGRES_PORT"

  # POSTGRES_DB=$(fetch_env_value POSTGRES_DB)
  # echo -e "POSTGRES_DB:\t\t\t$POSTGRES_DB"

  POSTGRES_DATABASE=$(fetch_env_value POSTGRES_DATABASE)
  echo -e "POSTGRES_DATABASE:\t\t$POSTGRES_DATABASE"

  echo
}

populate_init_scripts() {
  echo Populating Init Scripts...

  #region Create User
  DBScript_CreateUser="CREATE ROLE $POSTGRES_USER LOGIN PASSWORD '$POSTGRES_PASSWORD';";
  #endregion Create User

  #region Create Database
  DBScript_CreateDatabase="SELECT 'CREATE DATABASE "$POSTGRES_DATABASE"' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$POSTGRES_DATABASE')\gexec"
  #endregion Create Database

  #region Grant Privileges
  DBScript_GrantPrivileges="GRANT ALL PRIVILEGES ON DATABASE "$POSTGRES_DATABASE" TO $POSTGRES_USER;"
  #endregion Grant Privileges

  create_dir_if_missing "DB Init Scripts" $POSTGRES_INIT_SCRIPTS_PATH
  change_owner_recursively $(get_username) $POSTGRES_INIT_SCRIPTS_PATH

  echo -e "$DBScript_CreateUser"      > $POSTGRES_INIT_SCRIPTS_PATH/01_CreateUser.sql
  echo -e "$DBScript_CreateDatabase"  > $POSTGRES_INIT_SCRIPTS_PATH/02_CreateDatabase.sql
  echo -e "$DBScript_GrantPrivileges" > $POSTGRES_INIT_SCRIPTS_PATH/03_GrantPrivileges.sql
}

create_dir_if_missing() {
  if [ ! -d "$2" ]; then
    echo -e "Creating directory for:\t\t$1..."
    # echo Please input your password if/when prompted:
    if [ $(test_sudo) -eq 1 ]; then
      sudo mkdir -p "$2"
    else
      mkdir -p "$2"
    fi
  else
    echo -e "Directory exists for:\t\t$1"
  fi
}

change_owner_recursively() {
  # echo -e "[sudo] chown -R $1 \"$2\""
  if [ $(test_sudo) -eq 1 ]; then
    sudo chown -R $1 "$2"
  else
    chown -R $1 "$2"
  fi
}

stop_if_running() {
  running=$(docker container ls --all | grep ${container} | cut -d " " -f 1)
  if [ ! -z "$running" ]; then
    echo PostgreSQL Docker container already running as: $running
    echo Stopping container...
    docker container stop ${container} >/dev/null 2>&1
    echo Removing container...
    docker container rm ${container} >/dev/null 2>&1
    echo
  fi
}

run_container() {
  echo Running PostgreSQL Docker container...

  docker volume create postgres_database

  docker run  \
    --detach  \
    --name $container  \
    --publish $POSTGRES_PORT:5432  \
    --env POSTGRES_USER=$POSTGRES_ADMIN_USER  \
    --env POSTGRES_PASSWORD=$POSTGRES_ADMIN_PASSWORD  \
    --env PGDATA=/var/lib/postgresql/data/pgdata  \
    --env POSTGRES_DB=$POSTGRES_DATABASE  \
    --volume postgres_database:/var/lib/postgresql/data  \
    --volume "$(runtime_full_path)/$POSTGRES_INIT_SCRIPTS_PATH":/docker-entrypoint-initdb.d  \
    postgres
}

run_init_scripts() {
  echo -e "Running Init Scripts..."
  s="postgres://$POSTGRES_ADMIN_USER:$POSTGRES_ADMIN_PASSWORD@$POSTGRES_HOSTNAME:$POSTGRES_PORT/postgres"
  echo "Init Scripts Connection String: $s"
  pushd "$(runtime_full_path)"
  for queryFile in `ls $POSTGRES_INIT_SCRIPTS_PATH*.sql`; do
    echo -e "\nRunning Query File: $queryFile"
    echo -e "psql $s -f \"./$queryFile\""
    psql $s -f "./$queryFile" #>/dev/null 2>&1
  done
  popd
}

knex_migrate_latest() {
  echo -e "Migrating database to latest schema..."
  d=$(runtime_root_path)
  pushd "$d"
  knex migrate:latest
  popd
}

knex_seed_run() {
  echo -e "Populating seed data..."
  d=$(runtime_root_path)
  pushd "$d"
  knex seed:run
  popd
}
#endregion Functions


test_ostype
confirm_in_data_dir
test_for_requirements
populate_variables
populate_init_scripts
create_dir_if_missing Data $POSTGRES_DATA_PATH
change_owner_recursively $(get_username) $POSTGRES_DATA_PATH
echo
stop_if_running
run_container
sleep 2s  #wait for postgres in docker to start up
echo
run_init_scripts
echo
knex_migrate_latest
echo
knex_seed_run
echo
