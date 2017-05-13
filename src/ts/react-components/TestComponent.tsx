import * as React from "react";

/**
 * Created by akersten on 4/30/17.
 */
class CutCashAppProps {
  public name:string;
  public age:number;
}

export class CutCashApp extends React.Component<CutCashAppProps, any> {
  private foo:number;
  constructor(props:CutCashAppProps) {
    super(props);
    this.foo = 42;
  }
  render() {
    return <div>Hello world! My name is {this.props.name} and my age is {this.props.age}</div>
  }
}
