const app = Vue.createApp(
	{
		data() {
			return {
				baseUrl: 'https://vue3-course-api.hexschool.io/v2',
				userData: 	        
				{
					"username": "",
					"password": ""
				}
			};
		},
		methods : {
			login () {
				axios.post(`${this.baseUrl}/admin/signin`, this.userData)
				.then(res => {
					const {token, expired} = res.data;
					document.cookie = `wrightyuVueHW3Token=${token};expires=${new Date(expired)};`;
					alert("登入成功");
					window.location = "./products.html";
				})
				.catch(err => {
					alert(err.data.message);
				});
			}
		}
	}
);

app.mount("#app");

