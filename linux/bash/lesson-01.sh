#! /bin/bash
# Using comment by hash
echo "Hello world" # also a comment

echo "Enter name: "
read name
echo "Entered name: $name"

echo "Enter names: "
read name1 name2 name3
echo "Entered names: $name1, $name2, $name3"

echo "Enter names: "
read -a names
echo "Names : ${names[0]}, ${names[1]}"

# pass args
args=("$@")
echo ${args[1]} ${args[2]} ${args[3]}
echo $@ # all args
echo $# # number of args
