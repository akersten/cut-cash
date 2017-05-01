/**
 * Created by akersten on 4/30/17.
 */
/// <reference path="../../node_modules/@types/react/index.d.ts" />


class DemoProps {
  public name:string;
  public age:number;
}

class Demo extends React.Component<DemoProps, any> {
  private foo:number;
  constructor(props:DemoProps) {
    super(props);
    this.foo = 42;
  }
  render() {
    return <div>Hello world!</div>
  }
}