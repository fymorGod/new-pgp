import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    header: {
        width: '100%',
        height: 100,
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    title: {
        flex: 1,
        fontSize: 24,
        color: '#fff',
        fontWeight: '400',
        textAlign: 'center',
    },
    iconRight: {
        position: 'absolute',
        right: 30,
        top: 50,
        color: "#fff",
    },
    iconLeft: {
        position: 'absolute',
        left: 30,
        top: 45,
        color: "#fff",
    },
    boxInfo: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    infoText: {
        fontSize: 24,
        fontWeight: '300',
        color: '#373737',
    },
    list: {
        backgroundColor: '#fefefe',
        paddingBottom: 30,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
    },
    itemText: {
        fontSize: 18,
        color: "#ec060e",
    },
    contentContainer: {
        padding: 10,
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
        fontSize: 12,
    },
    tableTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        fontWeight: 'bold',
        backgroundColor: '#f9f9f9',
    },
    tableTotalText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
    },
    
});
