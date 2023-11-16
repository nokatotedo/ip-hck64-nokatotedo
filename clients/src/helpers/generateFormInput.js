export default function generateFormInput(e) {
  const input = {}
  for(let i = 0; i < e.target.length; i++) {
    if(!e.target[i].id.includes('btn')) input[e.target[i].id] = e.target[i].value
  }

  return input
}