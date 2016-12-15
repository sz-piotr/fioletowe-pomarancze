#! /bin/bash

NW_VERSION="v0.19.2"
NW_OS="linux"
NW_FILE_FORMAT="tar.gz"
NW_ARCH="x64"

function show_help {
    printf "Script downloads NW.js %s and creates an appropiate run script.\n" "$NW_VERSION"
    printf "Usage: %s [OPTIONS]\n" "$0"
    printf "\n"
    printf "Options:\n"
    printf "    -h --help    Show this screen.\n"
    printf "    -s OS_NAME   Select target os [linux | win | osx]\n"
    printf "                 Default: %s.\n" "$NW_OS"
    printf "    -ia32        Download the 32bit version.\n"
}

# read options

while :
do
	case "$1" in
        -h | --help )
            show_help
            exit 0
            ;;
		-s )
			NW_OS="$2"
			shift 2
            case "$NW_OS" in
                linux )
                    NW_OS="linux"
                    NW_FILE_FORMAT="tar.gz"
                    ;;
                win )
                    NW_OS="win"
                    NW_FILE_FORMAT="zip"
                    ;;
                osx )
                    NW_OS="osx"
                    NW_FILE_FORMAT="zip"
                    ;;
                * )
                    printf "Error: Unknown os: %s\n" "$2" >&2
                    exit 1
                    ;;
            esac
			;;
		-ia32 )
			NW_ARCH="ia32"
			shift
			;;
		-- ) # End of all options
			shift
			break
            ;;
		-* )
		    printf "Error: Unknown option: %s\n" "$1" >&2
            exit 1
		    ;;
		* ) # No more options
	        break
	        ;;
	esac
done

# setup variables
NW_URL="https://dl.nwjs.io/$NW_VERSION/nwjs-sdk-$NW_VERSION-$NW_OS-$NW_ARCH.$NW_FILE_FORMAT"
NW_DOWNLOAD_LOCATION=".temp/nw.$NW_FILE_FORMAT"

# download
mkdir -p .temp
if [ x"`which curl`" = x"" ] ; then
    wget "$NW_URL" -O "$NW_DOWNLOAD_LOCATION"
else
    curl "$NW_URL" > "$NW_DOWNLOAD_LOCATION"
fi

# uncompress
mkdir -p dist
if [ "$NW_FILE_FORMAT" = "tar.gz" ] ; then
    tar zxvf .temp/nw.tar.gz -C dist
else
    unzip .temp/nw.zip -d dist
fi

# clean up
rm -r .temp

# create run script
NW_FOLDER="nwjs-sdk-$NW_VERSION-$NW_OS-$NW_ARCH"
case "$NW_OS" in
    linux )
        printf "./dist/%s/nw ." "$NW_FOLDER" > run.sh
        chmod +x run.sh
        ;;
    osx )
        printf "./dist/%s/nwjs.app/Contents/MacOS/nwjs ." "$NW_FOLDER" > run.sh
        chmod +x run.sh
        ;;
    win )
        printf "dist\\%s\\%s ." "$NW_FOLDER" "nw.exe" > run.bat
        chmod +x run.bat
        ;;
esac
