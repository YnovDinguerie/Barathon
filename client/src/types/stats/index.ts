export interface StatsInterface {
  name: string
  value: number
}

export interface ActiveShapeProps {
  /**
   * The x-coordinate of center.
   */
  cx: number

  /**
   * The y-coordinate of center.
   */
  cy: number

  /**
   * The inner radius of pie.
   */
  midAngle: number

  /**
   * The inner radius of all sector.
   */
  innerRadius: number

  /**
   * The outer radius of all sector.
   */
  outerRadius: number

  /**
   * The start angle of first sector.
   */
  startAngle: number

  /**
   * The end angle of last sector.
   */
  endAngle: number

  /**
   * The color of sector.
   */
  fill: string

  /**
   * The data of sector.
   */
  payload: any

  percent: number

  value: number

  index: number
}
