let productModal = null;
let delProductModal = null;

const app = Vue.createApp({
  data () {
    return {
      baseUrl: 'https://vue3-course-api.hexschool.io/v2',
      userPath: "wrightyu",
      products: [], 
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
    }
  }, 
  methods : {
    checkAdmin () {
      axios.post(`${this.baseUrl}/api/user/check`)
      .then(res => {
        alert("successfully checked!");
        this.getProducts();
      })
      .catch(err => {
        alert(err.data.message);
        window.location = "index.html";
      });
    },
    getProducts () {
      axios.get(`${this.baseUrl}/api/${this.userPath}/admin/products/all`)
      .then(res => {
        this.products = res.data.products;
      })
      .catch(err => {
        alert(err.data.message);
      });
    }, 
    showModal (isNew, item) {
      if (isNew === 'new') {
        this.tempProduct = {
          imagesUrl: []
        };
        this.isNew = true;
        productModal.show();
      }else if (isNew === 'edit') {
        this.tempProduct = JSON.parse(JSON.stringify(item));;
        this.isNew = false;
        productModal.show();
      }else if (isNew === 'del') {
        this.tempProduct = {...item};
        delProductModal.show();
      }
    }, 
    createImages () {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
    updateProduct () {
      let url = `${this.baseUrl}/api/${this.userPath}/admin/product`;
      let apiMethod = "post";
      if (!this.isNew) {
        url = `${this.baseUrl}/api/${this.userPath}/admin/product/${this.tempProduct.id}`;
        apiMethod = "put";
      }
      axios[apiMethod](url, {data: this.tempProduct})
      .then(res => {
        alert(res.data.message);
        productModal.hide();
        this.getProducts();
      })
      .catch(err => {
        alert(err.data.message);
      });
    },
    delProduct () {
      axios.delete(`${this.baseUrl}/api/${this.userPath}/admin/product/${this.tempProduct.id}`)
      .then(res => {
        alert(res.data.message);
        productModal.hide();
        this.getProducts();
      })
      .catch(err => {
        alert(err.data.message);
      });
    },
  }, 
  mounted() {
    axios.defaults.headers.common.Authorization = document.cookie.replace(/(?:(?:^|.*;\s*)wrightyuVueHW3Token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.checkAdmin();

    productModal = new bootstrap.Modal(document.getElementById("productModal"));

    delProductModal = new bootstrap.Modal(document.getElementById("delProductModal"));


  },
});

app.mount("#app");