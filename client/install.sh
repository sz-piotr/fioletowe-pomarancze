#!/bin/bash

C_BLACK="\033[0;30m"
C_DARK_GRAY="\033[1;30m"
C_RED="\033[0;31m"
C_LIGHT_RED="\033[1;31m"
C_GREEN="\033[0;32m"
C_LIGHT_GREEN="\033[1;32m"
C_ORANGE="\033[0;33m"
C_YELLOW="\033[1;33m"
C_BLUE="\033[0;34m"
C_LIGHT_BLUE="\033[1;34m"
C_PURPLE="\033[0;35m"
C_LIGHT_PURPLE="\033[1;35m"
C_CYAN="\033[0;36m"
C_LIGHT_CYAN="\033[1;36m"
C_LIGHT_GRAY="\033[0;37m"
C_WHITE="\033[1;37m"
C_OFF="\033[0m"

NW_VERSION="v0.18.6"

if [ x"$1" = x"-h" -o x"$1" = x"--help" ] ; then
    echo -e "Script downloads nwjs ${NW_VERSION} runtime."
    echo "Usage: ./install.sh [OPTION]"
    echo ""
    echo "Arguments:"
    echo "   -h --help    Display help"
    echo "   -x64         Download x64 version (linux only)"
    exit
fi

NW_OS="linux"
NW_ARCH="ia32"
if [ "$(uname)" == "Darwin" ] ; then
    NW_OS="osx"
    NW_ARCH="x64"
fi
if [ x"$1" = x"-x64" ] ; then
    NW_ARCH="x64"
fi
NW_URL="https://dl.nwjs.io/$NW_VERSION/nwjs-sdk-$NW_VERSION-$NW_OS-$NW_ARCH.tar.gz"
NW_SAVE_LOCATION="dist/$NW_OS/nw.zip"

echo -e "${C_LIGHT_PURPLE}Preparing directories${C_OFF}"

if [ -e "$NW_SAVE_LOCATION" ] ; then
    echo -en "${C_LIGHT_RED}File exists continue?${C_OFF} [Y/n] "
    read WE
    if [ x"$WE" != x"y" -a x"$WE" != x"Y" ] ; then
        exit
    fi
fi
mkdir -p "dist/linux"

echo -e "${C_ORANGE}Downloading...${C_OFF}"

if [ x"`which curl`" = x"" ] ; then
    wget "$NW_URL" -O "$NW_SAVE_LOCATION"
else
    curl "$NW_URL" > "$NW_SAVE_LOCATION"
fi

echo -e "${C_LIGHT_GREEN}Done. Have a nice day${C_OFF}"
