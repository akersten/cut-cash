import * as React from "react";

/**
 * Created by akersten on 4/30/17.
 */
class DemoProps {
  public name:string;
  public age:number;
}

export class Demo extends React.Component<DemoProps, any> {
  private foo:number;
  constructor(props:DemoProps) {
    super(props);
    this.foo = 42;
  }
  render() {
    return <div>Hello world!</div>
  }
}
