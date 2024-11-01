import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    boxFilter: {
        width: 120,
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#ec060e',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnFilter: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconFilter: {
        color: '#fff',
    },
    filterContainer: {
        padding: 20,
    },
    dateButton: {
        padding: 10,
        backgroundColor: '#ec060e',
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
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
});
