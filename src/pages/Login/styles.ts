import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    formContainer: {
        width: '100%',
        marginTop: 10,
        alignSelf: 'center',
        paddingHorizontal: 30,
        gap: 20,
    },
    inputContainer: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#f2f2ff',
        overflow: 'hidden'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#11111F', 
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
    iconLeft: {
        marginRight: 0,
    },
    input: {
        width: '92%',
        borderWidth: 0,
        borderRadius: 0
    },
    iconRight: {
        marginLeft: -20,
    },
    main: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'left',
        color: '#760000',
        marginTop: 30
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -10,
        marginBottom: 5
    },
    footerContainer: {  
        position: 'absolute',
        bottom: 30,
        width: '100%',
        paddingHorizontal: 30,
        flexDirection: 'column',
        alignItems: 'center',
    },
    btnBuscar: {
        width: '80%',
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10, 
    },
    textBuscar: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff'
    }
})