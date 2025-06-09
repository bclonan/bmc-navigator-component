<template>
  <div class="m-chart" :class="containerClasses">
    <div v-if="title || subtitle" class="chart-header mb-4">
      <h3 v-if="title" class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      <p v-if="subtitle" class="text-sm text-gray-600">{{ subtitle }}</p>
    </div>

    <!-- Line Chart -->
    <div v-if="type === 'line'" class="relative">
      <svg :width="width" :height="height" class="overflow-visible">
        <!-- Grid Lines -->
        <g v-if="showGrid" class="grid-lines">
          <defs>
            <pattern id="grid" :width="gridSize" :height="gridSize" patternUnits="userSpaceOnUse">
              <path :d="`M ${gridSize} 0 L 0 0 0 ${gridSize}`" fill="none" stroke="#e5e7eb" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </g>

        <!-- Chart Area -->
        <g :transform="`translate(${padding.left}, ${padding.top})`">
          <!-- Y Axis -->
          <g class="y-axis">
            <line :x1="0" :y1="0" :x2="0" :y2="chartHeight" stroke="#6b7280" stroke-width="1"/>
            <g v-for="(tick, index) in yTicks" :key="`y-${index}`" class="tick">
              <line :x1="-5" :y1="tick.y" :x2="0" :y2="tick.y" stroke="#6b7280" stroke-width="1"/>
              <text :x="-10" :y="tick.y + 4" text-anchor="end" class="text-xs fill-gray-600">
                {{ formatValue(tick.value, 'y') }}
              </text>
            </g>
          </g>

          <!-- X Axis -->
          <g class="x-axis">
            <line :x1="0" :y1="chartHeight" :x2="chartWidth" :y2="chartHeight" stroke="#6b7280" stroke-width="1"/>
            <g v-for="(tick, index) in xTicks" :key="`x-${index}`" class="tick">
              <line :x1="tick.x" :y1="chartHeight" :x2="tick.x" :y2="chartHeight + 5" stroke="#6b7280" stroke-width="1"/>
              <text :x="tick.x" :y="chartHeight + 18" text-anchor="middle" class="text-xs fill-gray-600">
                {{ formatValue(tick.value, 'x') }}
              </text>
            </g>
          </g>

          <!-- Data Lines -->
          <g v-for="(series, seriesIndex) in dataSeries" :key="`series-${seriesIndex}`" class="data-series">
            <path
              :d="generateLinePath(series.data)"
              :stroke="series.color || colors[seriesIndex % colors.length]"
              :stroke-width="strokeWidth"
              fill="none"
              class="transition-all duration-300"
            />
            
            <!-- Data Points -->
            <g v-if="showPoints" class="data-points">
              <circle
                v-for="(point, pointIndex) in series.data"
                :key="`point-${seriesIndex}-${pointIndex}`"
                :cx="getX(point.x)"
                :cy="getY(point.y)"
                :r="pointRadius"
                :fill="series.color || colors[seriesIndex % colors.length]"
                class="transition-all duration-200 hover:r-6 cursor-pointer"
                @mouseenter="showTooltip($event, point, series)"
                @mouseleave="hideTooltip"
              />
            </g>
          </g>
        </g>
      </svg>

      <!-- Tooltip -->
      <div
        v-if="tooltip.visible"
        class="absolute z-10 bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      >
        {{ tooltip.content }}
      </div>
    </div>

    <!-- Bar Chart -->
    <div v-else-if="type === 'bar'" class="relative">
      <svg :width="width" :height="height" class="overflow-visible">
        <g :transform="`translate(${padding.left}, ${padding.top})`">
          <!-- Y Axis -->
          <g class="y-axis">
            <line :x1="0" :y1="0" :x2="0" :y2="chartHeight" stroke="#6b7280" stroke-width="1"/>
            <g v-for="(tick, index) in yTicks" :key="`y-${index}`" class="tick">
              <line :x1="-5" :y1="tick.y" :x2="0" :y2="tick.y" stroke="#6b7280" stroke-width="1"/>
              <text :x="-10" :y="tick.y + 4" text-anchor="end" class="text-xs fill-gray-600">
                {{ formatValue(tick.value, 'y') }}
              </text>
            </g>
          </g>

          <!-- X Axis -->
          <g class="x-axis">
            <line :x1="0" :y1="chartHeight" :x2="chartWidth" :y2="chartHeight" stroke="#6b7280" stroke-width="1"/>
          </g>

          <!-- Bars -->
          <g class="bars">
            <rect
              v-for="(item, index) in chartData"
              :key="`bar-${index}`"
              :x="getBarX(index)"
              :y="getY(item.y)"
              :width="barWidth"
              :height="chartHeight - getY(item.y)"
              :fill="item.color || colors[index % colors.length]"
              class="transition-all duration-300 hover:opacity-80 cursor-pointer"
              @mouseenter="showTooltip($event, item)"
              @mouseleave="hideTooltip"
            />
            
            <!-- Bar Labels -->
            <text
              v-for="(item, index) in chartData"
              :key="`label-${index}`"
              :x="getBarX(index) + barWidth / 2"
              :y="chartHeight + 15"
              text-anchor="middle"
              class="text-xs fill-gray-600"
            >
              {{ formatValue(item.x, 'x') }}
            </text>
          </g>
        </g>
      </svg>

      <!-- Tooltip -->
      <div
        v-if="tooltip.visible"
        class="absolute z-10 bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      >
        {{ tooltip.content }}
      </div>
    </div>

    <!-- Pie Chart -->
    <div v-else-if="type === 'pie'" class="relative flex items-center justify-center">
      <svg :width="width" :height="height" class="overflow-visible">
        <g :transform="`translate(${width/2}, ${height/2})`">
          <g v-for="(slice, index) in pieSlices" :key="`slice-${index}`" class="pie-slice">
            <path
              :d="slice.path"
              :fill="slice.color || colors[index % colors.length]"
              class="transition-all duration-300 hover:opacity-80 cursor-pointer"
              @mouseenter="showTooltip($event, slice.data)"
              @mouseleave="hideTooltip"
            />
            
            <!-- Slice Labels -->
            <text
              v-if="showLabels && slice.percentage > 5"
              :x="slice.labelX"
              :y="slice.labelY"
              text-anchor="middle"
              class="text-xs fill-white font-medium"
            >
              {{ slice.percentage.toFixed(1) }}%
            </text>
          </g>
        </g>
      </svg>

      <!-- Legend -->
      <div v-if="showLegend" class="ml-6 space-y-2">
        <div
          v-for="(item, index) in chartData"
          :key="`legend-${index}`"
          class="flex items-center space-x-2"
        >
          <div
            class="w-3 h-3 rounded"
            :style="{ backgroundColor: item.color || colors[index % colors.length] }"
          ></div>
          <span class="text-sm text-gray-700">{{ item.label || item.x }}</span>
          <span class="text-sm font-medium text-gray-900">{{ formatValue(item.y, 'y') }}</span>
        </div>
      </div>
    </div>

    <!-- Chart Legend (for line/bar charts) -->
    <div v-if="showLegend && (type === 'line' || type === 'bar') && dataSeries?.length > 1" class="mt-4 flex flex-wrap gap-4">
      <div
        v-for="(series, index) in dataSeries"
        :key="`legend-${index}`"
        class="flex items-center space-x-2"
      >
        <div
          class="w-3 h-3 rounded"
          :style="{ backgroundColor: series.color || colors[index % colors.length] }"
        ></div>
        <span class="text-sm text-gray-700">{{ series.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MChart',
  props: {
    type: {
      type: String,
      default: 'line',
      validator: value => ['line', 'bar', 'pie'].includes(value)
    },
    data: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 300
    },
    title: String,
    subtitle: String,
    colors: {
      type: Array,
      default: () => [
        '#3b82f6', '#ef4444', '#10b981', '#f59e0b',
        '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
      ]
    },
    showGrid: {
      type: Boolean,
      default: true
    },
    showPoints: {
      type: Boolean,
      default: true
    },
    showLabels: {
      type: Boolean,
      default: true
    },
    showLegend: {
      type: Boolean,
      default: false
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    pointRadius: {
      type: Number,
      default: 4
    },
    formatters: {
      type: Object,
      default: () => ({})
    },
    responsive: {
      type: Boolean,
      default: true
    }
  },
  
  data() {
    return {
      padding: { top: 20, right: 20, bottom: 40, left: 60 },
      gridSize: 20,
      tooltip: {
        visible: false,
        x: 0,
        y: 0,
        content: ''
      }
    };
  },
  
  computed: {
    containerClasses() {
      return [
        'w-full',
        { 'max-w-full': this.responsive }
      ];
    },
    
    chartWidth() {
      return this.width - this.padding.left - this.padding.right;
    },
    
    chartHeight() {
      return this.height - this.padding.top - this.padding.bottom;
    },
    
    chartData() {
      if (this.type === 'pie') {
        return this.data;
      }
      return this.dataSeries?.[0]?.data || this.data;
    },
    
    dataSeries() {
      if (Array.isArray(this.data) && this.data[0]?.data) {
        return this.data;
      }
      return [{ data: this.data, label: 'Data' }];
    },
    
    xExtent() {
      const allXValues = this.dataSeries.flatMap(series => 
        series.data.map(d => d.x)
      );
      return [Math.min(...allXValues), Math.max(...allXValues)];
    },
    
    yExtent() {
      const allYValues = this.dataSeries.flatMap(series => 
        series.data.map(d => d.y)
      );
      const min = Math.min(...allYValues);
      const max = Math.max(...allYValues);
      const padding = (max - min) * 0.1;
      return [min - padding, max + padding];
    },
    
    xTicks() {
      const [min, max] = this.xExtent;
      const tickCount = Math.min(8, this.chartData.length);
      const step = (max - min) / (tickCount - 1);
      
      return Array.from({ length: tickCount }, (_, i) => ({
        value: min + i * step,
        x: (i * step / (max - min)) * this.chartWidth
      }));
    },
    
    yTicks() {
      const [min, max] = this.yExtent;
      const tickCount = 6;
      const step = (max - min) / (tickCount - 1);
      
      return Array.from({ length: tickCount }, (_, i) => ({
        value: min + i * step,
        y: this.chartHeight - (i * step / (max - min)) * this.chartHeight
      }));
    },
    
    barWidth() {
      return this.chartWidth / this.chartData.length * 0.8;
    },
    
    pieSlices() {
      if (this.type !== 'pie') return [];
      
      const total = this.chartData.reduce((sum, item) => sum + item.y, 0);
      let currentAngle = -Math.PI / 2; // Start at top
      const radius = Math.min(this.width, this.height) / 2 - 20;
      
      return this.chartData.map((item, index) => {
        const percentage = (item.y / total) * 100;
        const angle = (item.y / total) * 2 * Math.PI;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;
        
        const x1 = Math.cos(startAngle) * radius;
        const y1 = Math.sin(startAngle) * radius;
        const x2 = Math.cos(endAngle) * radius;
        const y2 = Math.sin(endAngle) * radius;
        
        const largeArcFlag = angle > Math.PI ? 1 : 0;
        
        const path = [
          'M', 0, 0,
          'L', x1, y1,
          'A', radius, radius, 0, largeArcFlag, 1, x2, y2,
          'Z'
        ].join(' ');
        
        const labelAngle = startAngle + angle / 2;
        const labelRadius = radius * 0.7;
        const labelX = Math.cos(labelAngle) * labelRadius;
        const labelY = Math.sin(labelAngle) * labelRadius;
        
        currentAngle = endAngle;
        
        return {
          path,
          percentage,
          labelX,
          labelY,
          color: item.color || this.colors[index % this.colors.length],
          data: item
        };
      });
    }
  },
  
  methods: {
    getX(value) {
      const [min, max] = this.xExtent;
      return ((value - min) / (max - min)) * this.chartWidth;
    },
    
    getY(value) {
      const [min, max] = this.yExtent;
      return this.chartHeight - ((value - min) / (max - min)) * this.chartHeight;
    },
    
    getBarX(index) {
      const barSpacing = this.chartWidth / this.chartData.length;
      return index * barSpacing + (barSpacing - this.barWidth) / 2;
    },
    
    generateLinePath(data) {
      return data.map((point, index) => {
        const x = this.getX(point.x);
        const y = this.getY(point.y);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ');
    },
    
    formatValue(value, axis) {
      const formatter = this.formatters[axis];
      if (formatter) return formatter(value);
      
      if (typeof value === 'number') {
        if (axis === 'y' && Math.abs(value) >= 1000) {
          return `$${(value / 1000).toFixed(1)}K`;
        }
        return value.toLocaleString();
      }
      
      return value;
    },
    
    showTooltip(event, data, series) {
      const rect = event.target.getBoundingClientRect();
      const container = this.$el.getBoundingClientRect();
      
      this.tooltip = {
        visible: true,
        x: rect.left - container.left + 10,
        y: rect.top - container.top - 10,
        content: series 
          ? `${series.label}: ${this.formatValue(data.y, 'y')}` 
          : `${data.label || data.x}: ${this.formatValue(data.y, 'y')}`
      };
    },
    
    hideTooltip() {
      this.tooltip.visible = false;
    }
  }
};
</script>

<style scoped>
.m-chart {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.m-chart svg {
  display: block;
}

.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>