import React from 'react';
import Remarkable from 'remarkable';

// tutorial4.js
var Comment = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },

    render: function() {
        var md = new Remarkable();
        return (
            <div className="comment">
		<h2 className="commentAuthor">
		    {this.props.author}
		</h2>
		<span dangerouslySetInnerHTML={this.rawMarkup()} />
        <Link to={'/' + this.props.id}>Edit</Link>
            </div>
        );
    }
});

module.exports = Comment;
