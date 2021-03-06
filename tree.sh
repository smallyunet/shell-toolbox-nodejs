
tree=$(tree -tf --noreport -I '*~|*.md|*.sh|*.yml' --charset ascii -v $1 |
        sed -e 's/| \+/  /g' -e 's/[|`]-\+/ */g' -e 's:\(* \)\(\(.*/\)\([^/]\+\)\):\1<a href=\"\2\">\4<\/a>:g')
printf "# Index\n\n${tree}\n" > TREE.md
