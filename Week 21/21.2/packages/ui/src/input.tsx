function Input() {

    const style = {
        backgroundColor: '#2d3748',
        color: 'white',
        border: '1px solid #4a5568',
        borderRadius: '8px',
        padding: '8px',
        outline: 'none',
        width: '100%',
        maxWidth: '400px',
      }
      
    return (
      <div>
        <input type="text" style={style} placeholder="Enter text..." />
      </div>
    );
  }
  
  export default Input