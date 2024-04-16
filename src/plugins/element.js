import Vue from 'vue';
import {
    Alert,
    Button,
    Container,
    Checkbox,
    CheckboxGroup,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Row,
    Col,
    Switch,
    Tag,
    Tabs,
    Table,
    TableColumn,
    Calendar,
    Form,
    FormItem,
    Input,
    Tabs,
    TabPane,
    Tooltip,
    Timeline,
    TimelineItem,
    Message,
    MessageBox,
    Notification,
    Upload,
    Progress
} from 'element-ui';


Vue.use(Alert);
Vue.use(Button);
Vue.use(Container);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Switch);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Calendar);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Progress);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tooltip);
Vue.use(Tabs);
Vue.use(Tag);
Vue.use(Upload);
// message需要挂在到Vue原型对象里面，这样就可以通过this直接访问
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification