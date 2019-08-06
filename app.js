const root = document.querySelector('#root');
const apiURL = 'https://acme-users-api-rev.herokuapp.com/api/';

class App extends React.Component {
    constructor() {
        super();
        this.state = { products: [], companies: [] };

        this.getData();
    }
    getNames(arr) {
        return arr.map(item => item.name);
    }
    getData() {
        Promise.all([axios.get(`${apiURL}products`), axios.get(`${apiURL}companies`)])
        .then(data => {
            const products = this.getNames(data[0].data);
            const companies = this.getNames(data[1].data);
            console.log(products);
            console.log(companies);
            this.setState({ products, companies });
        })
        .catch((ex) => console.log(ex.message));
    }
    render() {
        const { products, companies } = this.state;
        const headerText = `Acme - We Have ${products.length} Products and ${companies.length} Companies`;
        const header = React.createElement('h1', null, headerText);
        const productArr = products.map ((prod, idx) => {
            return React.createElement('li', {key: idx}, prod);
        });
        const productList = React.createElement('ul', {id: 'products'}, productArr);
        const companyArr = companies.map ((comp, idx) => {
            return React.createElement('li', {key: idx}, comp);
        });
        const companyList = React.createElement('ul', {id: 'companies'}, companyArr);
        const lists = React.createElement('div', {id: 'lists'}, productList, companyList);
        const app = React.createElement('div', null, header, lists);
        return app;
    }
}

ReactDOM.render(React.createElement(App), root);