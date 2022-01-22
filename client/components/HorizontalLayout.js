
const layout_horizontal = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  border: 'solid 1px',
}

export default function HorizontalLayout({ children }){
  return(
      <div style={layout_horizontal}>
          { children }
      </div>
  )
}
