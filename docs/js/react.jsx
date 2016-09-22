var CatClicks = React.createClass({
    render: function() {
        return (<p className="clicks">Clicked {this.props.clicks} times</p>);
    }
});

var CatDisplay = React.createClass({
    render: function() {
        return (
            <div className="cat">
                <p>{this.props.cat.name}</p>
                <img onClick={this.props.handleCatClick} src={this.props.cat.url}/>
                <CatClicks clicks={this.props.cat.clicks}/>
            </div>
        );
    }
});

var CatPicker = React.createClass({
    render: function() {
        var options = [];
        this.props.cats.forEach(function(cat) {
            options.push(<option key={cat.name}>{cat.name}</option>);
        });
        return (
            <select onChange={this.props.handleCatChange}>{options}</select>
        );
    }
});

var CatClicker = React.createClass({
    getInitialState: function () {
        var cats = [];
        this.props.initialCats.forEach(function(cat) {
            cat.clicks = 0;
            cats.push(cat);
        });

        return {
            cat: cats[0],
            cats: cats
        };
    },

    handleCatClick: function () {
        var cat = this.state.cat;
        cat.clicks++;
        this.setState({cat: cat});
    },

    handleCatChange: function (event) {
        var newCat;
        this.state.cats.forEach(function (cat) {
            if (cat.name === event.target.value) {
                newCat = cat;
            }
        });

        if (typeof newCat !== 'undefined') {
            this.setState({cat: newCat});
        }
    },

    render: function() {
        return (
            <div>
                <CatPicker cats={this.state.cats} handleCatChange={this.handleCatChange}/>
                <CatDisplay cat={this.state.cat} handleCatClick={this.handleCatClick}/>
            </div>
        );
    }
});

var CATS = [
    {
        'name': 'Fergie',
        'url': 'http://cdn.playbuzz.com/cdn/0079c830-3406-4c05-a5c1-bc43e8f01479/7dd84d70-768b-492b-88f7-a6c70f2db2e9.jpg'
    },
    {
        'name': 'Felix',
        'url': 'http://media1.santabanta.com/full1/Animals/Cats/cats-93a.jpg'
    },
    {
        'name': 'Garfield',
        'url': 'http://cdn.revistadonna.clicrbs.com.br/wp-content/uploads/sites/9/2014/07/Smiling_Cat.jpg'
    },
    {
        'name': 'Tom',
        'url': 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0'
    },
    {
        'name': 'Murphy',
        'url': 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0'
    }
];

ReactDOM.render(
    <CatClicker initialCats={CATS} />,
    document.getElementById('container')
);
