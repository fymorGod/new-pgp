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
        top: 50,
        color: "#fff",
    },
    boxInfo: {
        marginTop: 10,
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
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#fefefe',
        paddingBottom: 30,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: "#f5f5f5",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    itemTextLeft: {
        fontSize: 16,
        color: "#333",

        fontWeight: "bold",
        flex: 1,
    },
    itemTextRight: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
        textAlign: "right",
        marginRight: 10, // espaço para o ícone
    },
    iconStyle: {
        marginLeft: 5,
    },
    itemContainer: {
        marginBottom: 8,
    },
    
});
