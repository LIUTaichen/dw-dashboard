import { Geofence } from './geofence';

export const GEOFENCES:Geofence[] = [
  { id: 1, name: 'Mr. Nice' , description: 'mocked description', latlngs: [[-36.816341328215024, 174.59912926807527],
                                          [-36.81936462546152, 174.59140450611238],
                                          [-36.815997764153494, 174.59003121509676],
                                          [-36.81345534217092, 174.59801346912508],
                                          [-36.815997764153494, 174.59955842151766],
                                        [-36.816341328215024, 174.59912926807527]]},
  { id: 2, name: 'Celeritas' , description: 'mocked description, second', latlngs: [[-36.892755305186604, 175.00920546648558],
                                          [-36.89604043270843, 175.00233900983153],
                                          [-36.894427351080104, 174.99757540662108],
                                          [-36.89034301324963, 174.99890578229247],
                                          [-36.88975951857661, 175.00036490399657],
                                          [-36.89051462848114, 175.0034118934375], 
                                          [-36.892755305186604, 175.00920546648558]]}
 
];