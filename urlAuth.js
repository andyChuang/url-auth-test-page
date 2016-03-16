var RequestArea = React.createClass({  
  onRequestChanged: function(e){
    e.preventDefault();
    this.props.onRequestChanged(e.target.value);
  },
  render: function(){
    return (
      <textarea placeholder="Your request string here" rows="5" onChange={this.onRequestChanged} style={{width:"80%"}} 
        defaultValue={this.props.defaultRequest}>
      </textarea>
    );
  }
});

var ResponseArea = React.createClass({
  render: function(){
    return (
      <textarea className="responseArea" placeholder="You'll get response here" rows="5" value={this.props.response} style={{width:"80%"}}>
      </textarea>
    );
  }
});

var MainContent = React.createClass({
  getInitialState: function(){
    return {
      response: "No response.",
      request: "Your request string here.",
      authServiceUrl: "http://localhost:8011/urlAuth/Auth.ashx",
      queryServiceUrl: "http://localhost:8011/urlAuth/Other.ashx",
      transType: "auth"
    };
  },
  onAuthServiceChanged: function(e){
    this.setState({authServiceUrl: e.target.value});
    console.log("onAuthServiceChanged:" + e.target.value);
  },
  onQueryServiceChanged: function(e){
    this.setState({queryServiceUrl: e.target.value}); 
    console.log("onQueryServiceChanged:" + e.target.value);   
  },
  onRequestChanged: function(request){
    this.setState({request: request});
    console.log("onRequestChanged:" + request);
  },
  onTransTypeChanged: function(e){
    console.log(e.target.value);
    this.setState({transType: e.target.value});
  },
  handleSendRequest: function(){
    if(this.state.transType=="auth"){
      this.sendRequestAjax({type: this.state.transType, url: this.state.authServiceUrl, data: this.state.request});
    }else if(this.state.transType=="query"){
      this.sendRequestAjax({type:this.state.transType, url: this.state.queryServiceUrl, data: this.state.request});
    }
  },
  sendRequestAjax: function(data){
    console.log(data);
    $.ajax({
      url: this.props.senderUrl,
      type: 'POST',
      data: data,
      beforeSend: function() {
        document.getElementById("message").style.display = "block";
      },
      complete: function() {
        document.getElementById("message").style.display = "none";
      },
      success: function(data) {
        this.setState({response: data});
        console.log("Response:" + data);
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({response: err.toString()});
        console.error(this.props.senderUrl, status, err.toString());
      }.bind(this)
    });
  },
  render: function(){
    return (
      <div>
        <input type="radio" 
               name="transactionType" 
               value="auth" 
               checked={this.state.transType == "auth"}
               onChange={this.onTransTypeChanged} />
               Auth (Sale, Void sale, Refund, Void refund):
        <input placeholder="Auth service url" onChange={this.onAuthServiceChanged} 
          defaultValue={this.state.authServiceUrl} style={{width:"30%"}} />

        <br/><br/>
        <input type="radio" 
               name="transactionType" 
               value="query" 
               checked={this.state.transType == "query"}
               onChange={this.onTransTypeChanged} />
        Query: 
        <input placeholder="Query service url" onChange={this.onQueryServiceChanged} 
          defaultValue={this.state.queryServiceUrl} style={{width:"30%"}} />
        <br/><br/>
        Request: <RequestArea onRequestChanged={this.onRequestChanged} defaultRequest={this.state.request}/>
        <br/><br/>
        Response: <ResponseArea response={this.state.response} />
        <br/><br/>
        <button onClick={this.handleSendRequest}>Send auth request</button>
        <div id="message" style={{borderStyle: "solid", borderWidth: "2px", display: "none", width: "10%", padding: "2px"}}>Sending</div>
      </div>
    );
  }
});

ReactDOM.render(
  <MainContent senderUrl="http://localhost:8004/urlAuthTestSite/sender.php"/>, document.getElementById("content")
);