import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    filterContainer: {
        padding: 20,
        marginTop: -10
    },
    dateButton: {
        padding: 10,
        backgroundColor: '#f2f2ff',
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#fff',
        alignItems: 'center',
    },
    textData: {
        fontSize: 16,
        color: '#002',
        fontWeight: '500'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444', 
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000, 
    },
    loadingText: {
        color: '#ffffff', 
        marginTop: 10, 
        fontSize: 16, 
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
    },
    btnBuscar: {
        backgroundColor: "red",
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        marginTop: 10
    },
    btnTextBuscar: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    }
});
