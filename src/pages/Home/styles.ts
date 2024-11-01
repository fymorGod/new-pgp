import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    header: {
        width: '100%',
        height: 100,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        top: 45,
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
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#f9f9f9",
    },
    contentText: {
        fontSize: 16,
        color: "#666",
    },
});
