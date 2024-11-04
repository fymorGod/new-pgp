import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
        backgroundColor: '#f2f2ff'
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableHeaderText: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    tableRowText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        textTransform: 'capitalize'
    },
    tableRowTextGreen: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        color:'green'
    },
    tableRowTextRed: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        color:'red'
    },
    tableTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        fontWeight: 'bold',
        backgroundColor: '#fff',
    },
    tableTotalText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
    }
})