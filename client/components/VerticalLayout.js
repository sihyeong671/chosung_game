
const layout_vertical = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    border: 'solid 1px',
    padding: '10px',
}

export default function VerticalLayout({ children }){
    return(
        <div style={layout_vertical}>
            { children }
        </div>
    )
}
