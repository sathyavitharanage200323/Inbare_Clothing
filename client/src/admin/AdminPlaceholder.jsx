export default function AdminPlaceholder({ title }) {
    return (
        <div style={{ maxWidth: 600, margin: '60px auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>{title}</h1>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>
                This section is under development. Coming soon in the next step.
            </p>
        </div>
    );
}
