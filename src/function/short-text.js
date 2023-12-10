
export const shortText = (text, type)=>{
  if(type === 'description'){
    if(text.length>150)
      return text.slice(0, 200)+'...'
    else if(! /\S/.test(  text  )){
      return 'no description'
    }
    else
      return text
  }
  if(type === 'title'){
    if(text.length>60)
      return text.slice(0, 59)+'...'
    else if(! /\S/.test(  text  )){
      return 'no title'
    }
    else
      return text
  }
}
