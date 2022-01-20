
const layout_horizontal = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  border: 'solid 1px',
  padding: '10px',
}

export default function HorizontalLayout({ children }){
  return(
      <div style={layout_horizontal}>
          { children }
      </div>
  )
}
