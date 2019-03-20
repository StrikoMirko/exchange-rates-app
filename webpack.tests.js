/**
 * @file
 * Webpack testing config.
 */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

var context = require.context('./src', true, /.+\.unit\.jsx?$/);
context.keys().forEach(context);
export default context;
