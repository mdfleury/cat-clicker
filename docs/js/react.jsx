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
        'name': 'Adam',
        'url': 'https://mdfleury.github.io/cat-clicker/images/cat1.jpg'
    },
    {
        'name': 'Bill',
        'url': 'https://mdfleury.github.io/cat-clicker/images/cat2.jpg'
    },
    {
        'name': 'Chris',
        'url': 'https://mdfleury.github.io/cat-clicker/images/cat3.jpg'
    },
    {
        'name': 'David',
        'url': 'https://mdfleury.github.io/cat-clicker/images/cat4.jpg'
    },
    {
        'name': 'Ebert',
        'url': 'https://mdfleury.github.io/cat-clicker/images/cat5.jpg'
    }
];

ReactDOM.render(
    <CatClicker initialCats={CATS} />,
    document.getElementById('container')
);
