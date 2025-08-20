const Offline = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            padding: '20px'
        }}>
            <div style={{
                fontSize: '48px',
                marginBottom: '20px'
            }}>
                🍜
            </div>
            <h2 style={{
                color: '#e74c3c',
                marginBottom: '10px',
                fontSize: '24px'
            }}>
                ¡Ups! Parece que estás offline
            </h2>
            <p style={{
                color: '#7f8c8d',
                fontSize: '16px',
                maxWidth: '400px',
                lineHeight: '1.5'
            }}>
                No podemos cargar los restaurantes en este momento. 
                Verifica tu conexión a internet y vuelve a intentar.
            </p>
        </div>
    );
};

export default Offline;