
const layout_vertical = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    border: 'solid 1px',
}

export default function VerticalLayout({ children }){
    return(
        <>
            <div style={layout_vertical}>
                { children }
            </div>
        </>
        
    )
}
