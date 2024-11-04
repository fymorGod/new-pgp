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
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 5,
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
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