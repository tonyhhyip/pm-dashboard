<script>
    import { Line } from 'vue-chartjs';
    export default Line.extend({
      props: ['data', 'options'],
      mounted() {
        this.render();
      },
      watch: {
        data() {
          this.render();
        }
      },
      methods: {
        render() {
          this.renderChart(this.data, this.options);
        }
      }
    });
</script>