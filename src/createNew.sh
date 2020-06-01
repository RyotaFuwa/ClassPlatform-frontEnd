#!/usr/bin/env bash
function_txt="""import React, {Component} from 'react';
import './$2.css';

const $2 = props => {
    return (
        <h1>$2</h1>
    )
}
export default $2;"""

class_txt="""import React, {Component} from 'react';
import './$2.css';

class $2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    render() {
        return (
        <h1>$2</h1>
        )
    }
}
export default $2;"""
pushd .
if [ $1 == 'page' ]
then
  cd pages
elif [ $1 == 'component' ]
then
  cd components
else
  echo "1st argument should be either page or component"
  exit
fi

mkdir $2
cd $2
touch $2.js $2.css
echo "$function_txt" >> $2.js
popd
