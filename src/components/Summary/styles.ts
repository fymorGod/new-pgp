import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        margin: 10,
        backgroundColor: '#f2f2ff'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 5,
    },
    label: {
        fontWeight: '500',
        color: '#324232',
        fontSize: 16,
    },
    value: {
        fontSize: 16,
        color: '#324232',
    },
    green: {
        color: 'green',
    },
    yellow: {
        color: 'yellow',
    },
    red: {
        color: 'red',
    },
});