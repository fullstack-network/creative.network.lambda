set -e

function_name=image-resizer
d=`date +"%m-%d-%y-%H-%M-%S"`
release_dir=releases/$d
mkdir -p $release_dir
zip -r function.zip index.js package.json node_modules
mv function.zip $release_dir
