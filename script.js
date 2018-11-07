class ListItem extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="card w-100">
          <div className="row">
            <div className="col-md-2">
              <img src={this.props.profile_image_url} alt="profile image" />
            </div>
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-3">
                  <strong>{this.props.name} </strong>
                </div>
                <div classname="col-md-2">
                  <div className="fa fa-stack">
                    <i className="fa fa-certificate fa-stack-2x" />
                    <i className="fa fa-check fa-stack-1x fa-inverse" />
                  </div>
                </div>
                <div classname="col-md-3">@{this.props.screen_name}</div>
                <div className="col-md-4">{this.props.created_at}</div>
              </div>
              <div classname="card-body">
                {this.props.text}{" "}
                <a href={this.props.link}>{this.props.link}</a>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <i className="fas fa-retweet" />{" "}
                  <span>
                    {this.props.retweet_count}
                    <i className="far fa-heart" /> {this.props.favorite_count}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class List extends React.Component {
  roundToNearestThousand(inputNumber) {
    if (inputNumber > 9999) {
      let result = Math.round(inputNumber / 1000);
      return result + "K";
    } else if (inputNumber > 999) {
      let result = Math.round(inputNumber / 100) / 10;
      return result + "K";
    } else {
      return inputNumber;
    }
  }

  regexText(post) {
    const regex = /((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g;
    let text = post.replace(regex, "");
    return text;
  }

  regexLink(post) {
    const regex = /((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g;
    let link = post.match(regex);
    return link;
  }

  render() {
    let itemsElements = this.props.items.map((item, index) => {
      return (
        <ListItem
          key={index}
          profile_image_url={item.user.profile_image_url}
          name={item.user.name}
          screen_name={item.user.screen_name}
          created_at={item.created_at}
          text={this.regexText(item.text)}
          link={this.regexLink(item.text)}
          retweet_count={this.roundToNearestThousand(item.retweet_count)}
          favorite_count={this.roundToNearestThousand(item.favorite_count)}
        />
      );
    });
    return (
      <html>
        <nav class="nav nav-pills nav-justified">
          <a class="nav-item nav-link active" href="#">
            Tweets
          </a>
          <a class="nav-item nav-link" href="#">
            Tweets & Replies
          </a>
          <a class="nav-item nav-link" href="#">
            Media
          </a>
          <a class="nav-item nav-link" href="#">
            Likes
          </a>
        </nav>
        <div>{itemsElements}</div>
      </html>
    );
  }
}

ReactDOM.render(<List items={tweets} />, document.getElementById("root"));
