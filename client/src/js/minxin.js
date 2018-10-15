const minxin = {

    data() {
        return {
            toolbar: {
                currentUrl: '',
                messageCount: 0
            },

            //messageTimeout
            messageTimeout: null
        };
    },

    methods: {

        //检查是否有新的消息
        checkMessage() {

        },

        //登出
        logout() {
            this.$api.user.logout().then((data) => {
                window.location.reload();
            }).catch((data) => {
                window.location.reload();
            });
        },
    }
};

export default minxin;