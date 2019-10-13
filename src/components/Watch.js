import { PureComponent } from 'react';

class Watch extends PureComponent {
    componentDidMount() {
        this.props.onChange(this.props);
    }
    componentDidUpdate() {
        this.props.onChange(this.props);
    }
    render() {
        return '';
    }
}
export default Watch;