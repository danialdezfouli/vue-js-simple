const apiKey = '0ce9c801d1b74007ac9baebc366d886a';
let sourceUrl =`https://newsapi.org/v2/sources?apiKey=${apiKey}`;
let apiUrl = `https://newsapi.org/v2/top-headlines?sources=%s&apiKey=${apiKey}`;

const app = new Vue({
	el: '#app',
	data:{
		load: true,
		curentSource: null,
		title: 'Loading...',
		sources:[
			{
				id: null,
				name: '---Loading---',
			}
		],
		articles:[],
	},
	watch:{
		curentSource(value){
			this.title = this.sources.find(item => item.id === value).name;
			console.log(value)
			this.load = true;
			this.articles = [];
			fetch(apiUrl.replace('%s',value)).then(async (data) => {
				let {articles} = await data.json();
			 	this.articles = articles;
			 	this.load = false;
			})
		}
	},
	mounted(){
		fetch(sourceUrl).then(async (data) => {
			let {sources} = await data.json();
			 this.sources = sources;
			this.curentSource = this.sources[0].id;
		});
	},
	methods:{
		changeHandle(data){

		}
	}
});
