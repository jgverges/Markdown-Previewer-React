import './App.css';
import React from 'react';
import { Form, FormGroup,Input, Label} from 'reactstrap';
import marked from 'marked';



class Markdown extends React.Component {
   getMarkdownText() {
    var rawMarkup = marked(this.props.text, {sanitize: true});
    return { __html: rawMarkup };
  }
  render() {
    return <div id="preview" dangerouslySetInnerHTML={this.getMarkdownText()} />
  }
}

/* a header (H1 size), a sub header (H2 size), a link,   inline code, a code block, a list item, a blockquote, an image, and bolded text. */

class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      text: `
# Header H1
## SubHeader
[links to Reactjs](https://es.reactjs.org/)

example of some \`npm i -S react react-dom\` inline code, 

////Code Block:

~~~
funtion(){
  return true
}
~~~~
- list
  - item list

> Quote

![Image](./logo.svg)

**bolded** __text__ _text_
      `,
/*       text:"# Welcome to my React Markdown Previewer\n## This is a sub-heading\n\nThere's also [links](https://es.reactjs.org/)\n\n`<div>Inline Code</div>`\n\n// Code block:\n~~~\nlet c=55;\nfunction(){ return something}\n~~~\n\n- list: \n  - list item\n\n> Blok Quote .-author\n\n![Image](./logo.svg) \n\ntext **bolded** _bolded_ __bold__\n > Block Quotes\n1. ul\n- ul item\n"
 */    }
    this.inputText = this.inputText.bind(this)
  }

  onKeyDownHandler = (event) => {
    var codigo = event.which || event.keyCode;

    console.log("Presionada: " + codigo, 'keyCode:',event.keyCode, 'target', event.target);
     
    if(codigo === 13){
      console.log("Tecla ENTER");
      return true
    }

    if(codigo >= 65 && codigo <= 90){
      console.log('***',String.fromCharCode(codigo));
      return false
    }
}

  inputText = (event) => {
    
    const value = event.target.value;
    const name = event.target.name;
    if (name === "text") {
      if (event.keyCode === 13){
        alert('yes');
        this.setState({
          text: '****'
        });
      }
      else {
        this.setState({
          text: value
        }); 
      }
    }
  }

  render(){
    return (
    <div className="container">

      <Form>
        <FormGroup>
            <Label for="exampleText">EDITOR</Label>
            <Input type="textarea" name="text" id="editor" 
                  value = {this.state.text}
                  placeholder = {this.state.text}
                  innerRef = {(input) => this.text = input} 
                  onChange = {this.inputText}
                  onKeyUp={(event) => this.onKeyDownHandler(event)}
             />
          </FormGroup>
      </Form>
      
      <h5>Preview</h5>
      <Markdown text={this.state.text}/>   

    </div>
    );
  }
}

export default App;
