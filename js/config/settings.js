var resource = {
	  1 : 'metal_mine',
	  2 : 'crystal_mine',
	  3 : 'deuterium_synthesizer',
	  4 : 'solar_plant',
	 12 : 'fusion_reactor',
	 14 : 'robotics_factory',
	 15 : 'nanite_factory',
	 21 : 'shipyard',
	 22 : 'metal_storage',
	 23 : 'crystal_storage',
	 24 : 'deuterium_storage',
	 31 : 'research_lab',
	 33 : 'terraformer',
	 41 : 'moon_base',
	 42 : 'sensor_phalanx',
	 43 : 'jump_gate',
	 44 : 'missile_silo',

	106 : 'espionage_tech',
	108 : 'computer_tech',
	109 : 'weapons_tech',
	110 : 'shielding_tech',
	111 : 'armour_tech',
	113 : 'energy_tech',
	114 : 'hyperspace_tech',
	115 : 'combustion_drive_tech',
	117 : 'impulse_drive_tech',
	118 : 'hyperspace_drive_tech',
	120 : 'laser_tech',
	121 : 'ion_tech',
	122 : 'plasma_tech',
	123 : 'intergalactic_research_tech',
	124 : 'astrophysics_tech',
	199 : 'graviton_tech',
	
	202 : 'small_cargo',
	203 : 'large_cargo',
	204 : 'light_fighter',
	205 : 'heavy_fighter',
	206 : 'cruiser',
	207 : 'battleship',
	208 : 'colony_ship',
	209 : 'recycler',
	210 : 'espionage_probe',
	211 : 'bomber',
	212 : 'solar_satellite',
	213 : 'destroyer',
	214 : 'deathstar',
	215 : 'battlecruiser',

	401 : 'rocket_launcher',
	402 : 'light_laser',
	403 : 'heavy_laser',
	404 : 'gauss_cannon',
	405 : 'ion_cannon',
	406 : 'plasma_cannon',
	407 : 'small_shield_dome',
	408 : 'large_shield_dome',
	502 : 'anti_ballistic_missiles',
	503 : 'interplanetary_missiles',

	701 : 'off_geologist',
	702 : 'off_scientist',
	703 : 'off_engineer',
	704 : 'off_general',
	705 : 'off_admiral',
	706 : 'off_energy',
	707 : 'off_storer',
	708 : 'off_spy',
	709 : 'off_exspy'
};

var requeriments = {
	'fusion_reactor' 				: {'deuterium_synthesizer' 	:   5,  'energy_tech' 				:   3},
	'nanite_factory' 				: {'robotics_factory' 		:  10,  'computer_tech' 			:  10},
	'shipyard' 						: {'robotics_factory' 		:   2},
	'terraformer' 					: {'nanite_factory' 			:   1,  'energy_tech' 				:  12},

	'sensor_phalanx' 				: {'moon_base' 				:   1},
	'jump_gate' 					: {'moon_base' 				:   1,  'hyperspace_tech' 			:   7},
	'missile_silo' 					: {'shipyard' 				:   1},

	'espionage_tech' 				: {'research_lab' 			:   3},
	'computer_tech' 				: {'research_lab' 			:   1},
	'weapons_tech' 					: {'research_lab' 			:   4},
	'shielding_tech' 				: {'energy_tech' 				:   3,  'research_lab' 			:   6},
	'armour_tech' 					: {'research_lab' 			:   2},
	'energy_tech' 					: {'research_lab' 			:   1},
	'hyperspace_tech' 				: {'energy_tech' 				:   5,  'shielding_tech' 			:   5,  'research_lab' 			:   7},
	'combustion_drive_tech' 		: {'energy_tech' 				:   1,  'research_lab' 			:   1},
	'impulse_drive_tech' 			: {'energy_tech' 				:   1,  'research_lab' 			:   2},
	'hyperspace_drive_tech' 		: {'hyperspace_tech' 			:   3,  'research_lab' 			:   7},
	'laser_tech' 					: {'research_lab' 			:   1,  'energy_tech' 				:   2},
	'ion_tech' 						: {'research_lab' 			:   4,  'laser_tech' 				:   5,  'energy_tech' 				:   4},
	'plasma_tech' 					: {'research_lab' 			:   5,  'energy_tech' 				:   8,  'laser_tech' 				:  10,  'ion_tech'	 		:   5},
	'intergalactic_research_tech' 	: {'research_lab' 			:  10,  'computer_tech' 			:   8,  'hyperspace_tech' 			:   8},
	'astrophysics_tech' 			: {'research_lab' 			:   3,  'espionage_tech' 			:   4,  'impulse_drive_tech' 		: 	 3},
	'graviton_tech' 				: {'research_lab' 			:  12},

	'small_cargo' 					: {'shipyard' 				:   2,  'combustion_drive_tech' 	:   2},
	'large_cargo' 					: {'shipyard' 				:   4,  'combustion_drive_tech' 	:   6},
	'light_fighter' 				: {'shipyard' 				:   1,  'combustion_drive_tech' 	:   1},
	'heavy_fighter' 				: {'shipyard' 				:   3,  'armour_tech' 				:   2,  'impulse_drive_tech' 		:   2},
	'cruiser' 						: {'shipyard' 				:   5,  'impulse_drive_tech' 		:   4,  'ion_tech' 				:   2},
	'battleship' 					: {'shipyard' 				:   7,  'hyperspace_drive_tech' 	:   4},
	'colony_ship' 					: {'shipyard' 				:   4,  'impulse_drive_tech' 		:   3},
	'recycler' 						: {'shipyard' 				:   4,  'combustion_drive_tech' 	:   6,  'shielding_tech' 			:   2},
	'espionage_probe' 				: {'shipyard' 				:   3,  'combustion_drive_tech' 	:   3,  'espionage_tech' 			:   2},
	'bomber' 						: {'impulse_drive_tech' 		:   6,  'shipyard' 				:   8,  'plasma_tech' 				:   5},
	'solar_satellite' 				: {'shipyard' 				:   1},
	'destroyer' 					: {'shipyard' 				:   9,  'hyperspace_drive_tech' 	:   6,  'hyperspace_tech' 			:   5},
	'deathstar' 					: {'shipyard' 				:  12,  'hyperspace_drive_tech' 	:   7,  'hyperspace_tech' 			:   6,  'graviton_tech' 	:   1},
	'battlecruiser' 				: {'hyperspace_tech' 			:   5,  'laser_tech' 				:  12,  'hyperspace_drive_tech' 	:   5,  'shipyard' 		:   8},

	'rocket_launcher' 				: {'shipyard' 				:   1},
	'light_laser' 					: {'energy_tech' 				:   1,  'shipyard' 				:   2,  'laser_tech' 				:   3},
	'heavy_laser' 					: {'energy_tech' 				:   3,  'shipyard' 				:   4,  'laser_tech' 				:   6},
	'gauss_cannon' 					: {'shipyard' 				:   6,  'energy_tech' 				:   6,  'weapons_tech' 			:   3,  'shielding_tech' 	:   1},
	'ion_cannon' 					: {'shipyard' 				:   4,  'ion_tech' 				:   4},
	'plasma_cannon' 				: {'shipyard' 				:   8,  'plasma_tech' 				:   7},
	'small_shield_dome' 			: {'shielding_tech' 			:   2,  'shipyard' 				:   1},
	'large_shield_dome' 			: {'shielding_tech' 			:   6,  'shipyard' 				:   6},
	'anti_ballistic_missiles' 		: {'missile_silo' 			:   2,  'shipyard'	 				:   1},
	'interplanetary_missiles' 		: {'missile_silo' 			:   4,  'shipyard' 				:   1,  'impulse_drive_tech' 		:   1}
};

var pricelist = {
	'metal_mine' 					: { 'metal' :      60, 	'crystal' :      15, 	'deuterium' :       0, 	'energy' :    0, 			'factor' : 1.5},
	'crystal_mine' 					: { 'metal' :      48, 	'crystal' :      24, 	'deuterium' :       0, 	'energy' :    0, 			'factor' : 1.6},
	'deuterium_synthesizer' 		: { 'metal' :     225, 	'crystal' :      75, 	'deuterium' :       0, 	'energy' :    0, 			'factor' : 1.5},
	'solar_plant' 					: { 'metal' :      75, 	'crystal' :      30, 	'deuterium' :       0, 	'energy' :    0, 			'factor' : 1.5},
	'fusion_reactor' 				: { 'metal' :     900, 	'crystal' :     360, 	'deuterium' :     180, 	'energy' :    0, 			'factor' : 1.8},
	'robotics_factory' 				: { 'metal' :     400, 	'crystal' :     120, 	'deuterium' :     200, 	'energy' :    0, 			'factor' :   2},
	'nanite_factory' 				: { 'metal' : 1000000, 	'crystal' :  500000, 	'deuterium' :  100000, 	'energy' :    0, 			'factor' :   2},
	'shipyard' 						: { 'metal' :     400, 	'crystal' :     200, 	'deuterium' :     100, 	'energy' :    0, 			'factor' :   2},
	'metal_storage' 				: { 'metal' :    1000, 	'crystal' :       0, 	'deuterium' :       0, 	'energy' :    0, 			'factor' :   2},
	'crystal_storage' 				: { 'metal' :    1000, 	'crystal' :     500, 	'deuterium' :       0, 	'energy' :    0, 			'factor' :   2},
	'deuterium_storage' 			: { 'metal' :    1000, 	'crystal' :    1000, 	'deuterium' :       0, 	'energy' :    0, 			'factor' :   2},
	'research_lab' 					: { 'metal' :     200, 	'crystal' :     400, 	'deuterium' :     200, 	'energy' :    0, 			'factor' :   2},
	'terraformer' 					: { 'metal' :       0, 	'crystal' :   50000, 	'deuterium' :  100000, 	'energy' : 1000, 			'factor' :   2},
	'moon_base' 					: { 'metal' :   20000, 	'crystal' :   40000, 	'deuterium' :   20000, 	'energy' :    0, 			'factor' :   2},
	'sensor_phalanx' 				: { 'metal' :   20000, 	'crystal' :   40000, 	'deuterium' :   20000, 	'energy' :    0, 			'factor' :   2},
	'jump_gate' 					: { 'metal' : 2000000, 	'crystal' : 4000000, 	'deuterium' : 2000000, 	'energy' :    0, 			'factor' :   2},
	'missile_silo' 					: { 'metal' :   20000, 	'crystal' :   20000, 	'deuterium' :    1000, 	'energy' :    0, 			'factor' :   2},
	
	'espionage_tech' 				: { 'metal' :     200, 	'crystal' :    1000, 	'deuterium' :     200, 	'energy' :    0, 			'factor' :   2},
	'computer_tech' 				: { 'metal' :       0, 	'crystal' :     400, 	'deuterium' :     600, 	'energy' :    0, 			'factor' :   2},
	'weapons_tech' 					: { 'metal' :     800, 	'crystal' :     200, 	'deuterium' :       0, 	'energy' :    0, 			'factor' :   2},
	'shielding_tech' 				: { 'metal' :     200, 	'crystal' :     600, 	'deuterium' :       0, 	'energy' :    0, 			'factor' :   2},
	'armour_tech' 					: { 'metal' :    1000, 	'crystal' :       0, 	'deuterium' :       0, 	'energy' :    0, 			'factor' :   2},
	'energy_tech' 					: { 'metal' :       0, 	'crystal' :     800, 	'deuterium' :     400, 	'energy' :    0, 			'factor' :   2},
	'hyperspace_tech' 				: { 'metal' :       0, 	'crystal' :    4000, 	'deuterium' :    2000, 	'energy' :    0, 			'factor' :   2},
	'combustion_drive_tech' 		: { 'metal' :     400, 	'crystal' :       0, 	'deuterium' :     600, 	'energy' :    0, 			'factor' :   2},
	'impulse_drive_tech' 			: { 'metal' :    2000, 	'crystal' :    4000, 	'deuterium' :    600, 		'energy' :    0, 			'factor' :   2},
	'hyperspace_drive_tech' 		: { 'metal' :   10000, 	'crystal' :   20000, 	'deuterium' :    6000, 	'energy' :    0, 			'factor' :   2},
	'laser_tech' 					: { 'metal' :     200, 	'crystal' :     100, 	'deuterium' :       0, 	'energy' :    0, 			'factor' :   2},
	'ion_tech' 						: { 'metal' :    1000, 	'crystal' :     300, 	'deuterium' :     100, 	'energy' :    0, 			'factor' :   2},
	'plasma_tech' 					: { 'metal' :    2000, 	'crystal' :    4000, 	'deuterium' :    1000, 	'energy' :    0, 			'factor' :   2},
	'intergalactic_research_tech' 	: { 'metal' :  240000, 	'crystal' :  400000, 	'deuterium' :  160000, 	'energy' :    0, 			'factor' :   2},
	'astrophysics_tech' 			: { 'metal' :    4000, 	'crystal' :    8000, 	'deuterium' :    4000, 	'energy' :    0, 			'factor' :   1.75},
	'graviton_tech' 				: { 'metal' :       0, 	'crystal' :       0, 	'deuterium' :       0, 	'energy_max' : 300000, 	'factor' :   3},

	'small_cargo' 					: { 'metal' :     2000, 'crystal' :     2000, 	'deuterium' :       0, 	'energy' : 0, 				'factor' : 1, 'consumption' :   10, 'consumption2' :   20, 'speed' :      5000, 'speed2' :     10000, 'capacity' :     5000 },
	'large_cargo' 					: { 'metal' :     6000, 'crystal' :     6000, 	'deuterium' :       0, 	'energy' : 0, 				'factor' : 1, 'consumption' :   50, 'consumption2' :   50, 'speed' :      7500, 'speed2' :      7500, 'capacity' :    25000 },
	'light_fighter' 				: { 'metal' :     3000, 'crystal' :     1000, 	'deuterium' :       0, 	'energy' : 0, 				'factor' : 1, 'consumption' :   20, 'consumption2' :   20, 'speed' :     12500, 'speed2' :     12500, 'capacity' :       50 },
	'heavy_fighter' 				: { 'metal' :     6000, 'crystal' :     4000, 	'deuterium' :       0, 	'energy' : 0, 				'factor' : 1, 'consumption' :   75, 'consumption2' :   75, 'speed' :     10000, 'speed2' :     10000, 'capacity' :      100 },
	'cruiser' 						: { 'metal' :    20000, 'crystal' :     7000, 	'deuterium' :    2000, 	'energy' : 0, 				'factor' : 1, 'consumption' :  300, 'consumption2' :  300, 'speed' :     15000, 'speed2' :     15000, 'capacity' :      800 },
	'battleship' 					: { 'metal' :    45000, 'crystal' :    15000, 	'deuterium' :       0, 	'energy' : 0, 				'factor' : 1, 'consumption' :  500, 'consumption2' :  500, 'speed' :     10000, 'speed2' :     10000, 'capacity' :     1500 },
	'colony_ship' 					: { 'metal' :    10000, 'crystal' :    20000, 	'deuterium' :   10000, 	'energy' : 0, 				'factor' : 1, 'consumption' : 1000, 'consumption2' : 1000, 'speed' :      2500, 'speed2' :      2500, 'capacity' :     7500 },
	'recycler' 						: { 'metal' :    10000, 'crystal' :     6000, 	'deuterium' :    2000, 	'energy' : 0, 				'factor' : 1, 'consumption' :  300, 'consumption2' :  300, 'speed' :      2000, 'speed2' :      2000, 'capacity' :    20000 },
	'espionage_probe' 				: { 'metal' :        0, 'crystal' :     1000, 	'deuterium' :       0, 	'energy' : 0, 				'factor' : 1, 'consumption' :    1, 'consumption2' :    1, 'speed' : 100000000, 'speed2' : 100000000, 'capacity' :        1 },
	'bomber' 						: { 'metal' :    50000, 'crystal' :    25000, 	'deuterium' :   15000, 	'energy' : 0, 				'factor' : 1, 'consumption' : 1000, 'consumption2' : 1000, 'speed' :      4000, 'speed2' :      5000, 'capacity' :      500 },
	'solar_satellite' 				: { 'metal' :        0, 'crystal' :     2000, 	'deuterium' :     500, 	'energy' : 0, 				'factor' : 1, 'consumption' :    0, 'consumption2' :    0, 'speed' :         0, 'speed2' :         0, 'capacity' :        0 },
	'destroyer' 					: { 'metal' :    60000, 'crystal' :    50000, 	'deuterium' :   15000, 	'energy' : 0, 				'factor' : 1, 'consumption' : 1000, 'consumption2' : 1000, 'speed' :      5000, 'speed2' :      5000, 'capacity' :     2000 },
	'deathstar' 					: { 'metal' :  5000000, 'crystal' :  4000000, 	'deuterium' : 1000000, 	'energy' : 0, 				'factor' : 1, 'consumption' :    1, 'consumption2' :    1, 'speed' :       100, 'speed2' :       100, 'capacity' :  1000000 },
	'battlecruiser' 				: { 'metal' :    30000, 'crystal' :    40000, 	'deuterium' :   15000, 	'energy' : 0, 				'factor' : 1, 'consumption' :  250, 'consumption2' :  250, 'speed' :     10000, 'speed2' :     10000, 'capacity' :      750 },
       
	'rocket_launcher' 				: { 'metal' :    2000, 	'crystal' :       0, 	'deuterium' :       0, 	'energy' : 0, 				'factor' : 1 },
	'light_laser' 					: { 'metal' :    1500, 	'crystal' :     500, 	'deuterium' :       0, 	'energy' : 0, 				'factor' : 1 },
	'heavy_laser' 					: { 'metal' :    6000, 	'crystal' :    2000, 	'deuterium' :       0, 	'energy' : 0, 				'factor' : 1 },
	'gauss_cannon' 					: { 'metal' :   20000, 	'crystal' :   15000, 	'deuterium' :    2000, 	'energy' : 0, 				'factor' : 1 },
	'ion_cannon' 					: { 'metal' :    2000, 	'crystal' :    6000, 	'deuterium' :       0, 	'energy' : 0, 				'factor' : 1 },
	'plasma_cannon' 				: { 'metal' :   50000, 	'crystal' :   50000, 	'deuterium' :   30000, 	'energy' : 0, 				'factor' : 1 },
	'small_shield_dome' 			: { 'metal' :   10000, 	'crystal' :   10000, 	'deuterium' :       0, 	'energy' : 0, 				'factor' : 1 },
	'large_shield_dome' 			: { 'metal' :   50000, 	'crystal' :   50000, 	'deuterium' :       0, 	'energy' : 0, 				'factor' : 1 },
        
	'anti_ballistic_missiles' 		: { 'metal' :    8000, 	'crystal' :    0, 		'deuterium' :    2000, 	'energy' : 0, 				'factor' : 1 },
	'interplanetary_missiles' 		: { 'metal' :   12500, 	'crystal' :    2500, 	'deuterium' :   10000, 	'energy' : 0, 				'factor' : 1 }

};
	

var CombatCaps = {
	'small_cargo' 				: { 'shield' :    10,  'attack' :      5, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    5, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1, 'rocket_launcher' :   1, 'light_laser' :   1, 'heavy_laser' :   1, 'gauss_cannon' :   1, 'ion_cannon' :   1, 'plasma_cannon' :   1, 'small_shield_dome' :   1, 'large_shield_dome' :   1 }},
	'large_cargo' 				: { 'shield' :    25,  'attack' :      5, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    5, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1, 'rocket_launcher' :   1, 'light_laser' :   1, 'heavy_laser' :   1, 'gauss_cannon' :   1, 'ion_cannon' :   1, 'plasma_cannon' :   1, 'small_shield_dome' :   1, 'large_shield_dome' :   1 }},
	'light_fighter' 			: { 'shield' :    10,  'attack' :     50, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    5, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1, 'rocket_launcher' :   1, 'light_laser' :   1, 'heavy_laser' :   1, 'gauss_cannon' :   1, 'ion_cannon' :   1, 'plasma_cannon' :   1, 'small_shield_dome' :   1, 'large_shield_dome' :   1 }},
	'heavy_fighter' 			: { 'shield' :    25,  'attack' :    150, 'sd' : {'small_cargo' :   3, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    5, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1, 'rocket_launcher' :   1, 'light_laser' :   1, 'heavy_laser' :   1, 'gauss_cannon' :   1, 'ion_cannon' :   1, 'plasma_cannon' :   1, 'small_shield_dome' :   1, 'large_shield_dome' :   1 }},
	'cruiser' 					: { 'shield' :    50,  'attack' :    400, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   6, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    5, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1, 'rocket_launcher' :  10, 'light_laser' :   1, 'heavy_laser' :   1, 'gauss_cannon' :   1, 'ion_cannon' :   1, 'plasma_cannon' :   1, 'small_shield_dome' :   1, 'large_shield_dome' :   1 }},
	'battleship' 				: { 'shield' :   200,  'attack' :   1000, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    5, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1, 'rocket_launcher' :   1, 'light_laser' :   1, 'heavy_laser' :   1, 'gauss_cannon' :   1, 'ion_cannon' :   1, 'plasma_cannon' :   1, 'small_shield_dome' :   1, 'large_shield_dome' :   1 }},
	'colony_ship' 				: { 'shield' :   100,  'attack' :     50, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    5, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1, 'rocket_launcher' :   1, 'light_laser' :   1, 'heavy_laser' :   1, 'gauss_cannon' :   1, 'ion_cannon' :   1, 'plasma_cannon' :   1, 'small_shield_dome' :   1, 'large_shield_dome' :   1 }},
	'recycler' 					: { 'shield' :    10,  'attack' :      1, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    5, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1, 'rocket_launcher' :   1, 'light_laser' :   1, 'heavy_laser' :   1, 'gauss_cannon' :   1, 'ion_cannon' :   1, 'plasma_cannon' :   1, 'small_shield_dome' :   1, 'large_shield_dome' :   1 }},
	'espionage_probe' 			: { 'shield' :     0,  'attack' :      0, 'sd' : {'small_cargo' :   0, 'large_cargo' :   0, 'light_fighter' :   0, 'heavy_fighter' :   0, 'cruiser' :   0, 'battleship' :   0, 'colony_ship' :   0, 'recycler' :   0, 'espionage_probe' :    0, 'bomber' :   0, 'solar_satellite' :    0, 'destroyer' :   0, 'deathstar' :   0, 'battlecruiser' :   0, 'rocket_launcher' :   0, 'light_laser' :   0, 'heavy_laser' :   0, 'gauss_cannon' :   0, 'ion_cannon' :   0, 'plasma_cannon' :   0, 'small_shield_dome' :   0, 'large_shield_dome' :   0 }},
	'bomber' 					: { 'shield' :   500,  'attack' :   1000, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    5, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1, 'rocket_launcher' :  20, 'light_laser' :  20, 'heavy_laser' :  10, 'gauss_cannon' :   1, 'ion_cannon' :  10, 'plasma_cannon' :   1, 'small_shield_dome' :   1, 'large_shield_dome' :   1 }},
	'solar_satellite' 			: { 'shield' :     1,  'attack' :      1, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    1, 'bomber' :   1, 'solar_satellite' :    0, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1, 'rocket_launcher' :   1, 'light_laser' :   1, 'heavy_laser' :   1, 'gauss_cannon' :   1, 'ion_cannon' :   1, 'plasma_cannon' :   1, 'small_shield_dome' :   1, 'large_shield_dome' :   1 }},
	'destroyer' 				: { 'shield' :   500,  'attack' :   2000, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    5, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   2, 'rocket_launcher' :   1, 'light_laser' :  10, 'heavy_laser' :   1, 'gauss_cannon' :   1, 'ion_cannon' :   1, 'plasma_cannon' :   1, 'small_shield_dome' :   1, 'large_shield_dome' :   1 }},
	'deathstar' 				: { 'shield' : 50000,  'attack' : 200000, 'sd' : {'small_cargo' : 250, 'large_cargo' : 250, 'light_fighter' : 200, 'heavy_fighter' : 100, 'cruiser' :  33, 'battleship' :  30, 'colony_ship' : 250, 'recycler' : 250, 'espionage_probe' : 1250, 'bomber' :  25, 'solar_satellite' : 1250, 'destroyer' :   5, 'deathstar' :   1, 'battlecruiser' :  15, 'rocket_launcher' : 200, 'light_laser' : 200, 'heavy_laser' : 100, 'gauss_cannon' :  50, 'ion_cannon' : 100, 'plasma_cannon' :   1, 'small_shield_dome' :   1, 'large_shield_dome' :   1 }},
	'battlecruiser' 			: { 'shield' :   400,  'attack' :    700, 'sd' : {'small_cargo' :   3, 'large_cargo' :   3, 'light_fighter' :   1, 'heavy_fighter' :   4, 'cruiser' :   4, 'battleship' :   7, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    5, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1, 'rocket_launcher' :   1, 'light_laser' :   1, 'heavy_laser' :   1, 'gauss_cannon' :   1, 'ion_cannon' :   1, 'plasma_cannon' :   1, 'small_shield_dome' :   1, 'large_shield_dome' :   1 }},
    
	
	'rocket_launcher' 			: { 'shield' :    20,  'attack' :     80, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    0, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1} },
	'light_laser' 				: { 'shield' :    25,  'attack' :    100, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    0, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1} },
	'heavy_laser' 				: { 'shield' :   100,  'attack' :    250, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    0, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1} },
	'gauss_cannon' 				: { 'shield' :   200,  'attack' :   1100, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    0, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1} },
	'ion_cannon' 				: { 'shield' :   500,  'attack' :    150, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    0, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1} },
	'plasma_cannon' 			: { 'shield' :   300,  'attack' :   3000, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    0, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1} },
	'small_shield_dome' 		: { 'shield' :  2000,  'attack' :      1, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    0, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1} },
	'large_shield_dome' 		: { 'shield' : 10000,  'attack' :      1, 'sd' : {'small_cargo' :   1, 'large_cargo' :   1, 'light_fighter' :   1, 'heavy_fighter' :   1, 'cruiser' :   1, 'battleship' :   1, 'colony_ship' :   1, 'recycler' :   1, 'espionage_probe' :    5, 'bomber' :   1, 'solar_satellite' :    0, 'destroyer' :   1, 'deathstar' :   1, 'battlecruiser' :   1} },
							
	'anti_ballistic_missiles' 	: { 'shield' :     1,  'attack' :      1, 'sd' : {'anti_ballistic_missiles' :   0} },
	'interplanetary_missiles' 	: { 'shield' :     1,  'attack' :  12000, 'sd' : {'interplanetary_missiles' :   0} }
};


var ProdGrid = {
	'metal_mine'   : { 
		'metal'     : '   (30 * BuildLevel * Math.pow((1.1), BuildLevel)) * (0.1 * BuildLevelFactor) ',
		'crystal'   : '   0 ',
		'deuterium' : '   0 ',
		'energy'    : ' - (10 * BuildLevel * Math.pow((1.1), BuildLevel)) * (0.1 * BuildLevelFactor) '
	},
	'crystal_mine'  : { 
		'metal'     : '   0 ',
		'crystal'   : '   (24 * BuildLevel * Math.pow((1.1), BuildLevel)) * {0.1 * BuildLevelFactor) ',
		'deuterium' : '   0 ',
		'energy'    : ' - (10 * BuildLevel * Math.pow((1.1), BuildLevel)) * {0.1 * BuildLevelFactor) '
	},
	'deuterium_synthesizer'   : { 
		'metal'     : '   0 ',
		'crystal'   : '   0 ',
		'deuterium' : '  ((10 * BuildLevel * Math.pow((1.1), BuildLevel)) * (1.28-0.002 * BuildTemp)) * (0.1 * BuildLevelFactor) ',
		'energy'    : ' - (20 * BuildLevel * Math.pow((1.1), BuildLevel)) * (0.1 * BuildLevelFactor) '
	},
	'solar_plant'   : {
		'metal'     : '   0 ',
		'crystal'   : '   0 ',
		'deuterium' : '   0 ',
		'energy'    : '   (20 * BuildLevel * Math.pow((1.1), BuildLevel)) * (0.1 * BuildLevelFactor) '
	},
	'fusion_reactor': {
		'metal'     : '   0 ',
		'crystal'   : '   0 ',
		'deuterium' : ' - (05 * BuildLevel * Math.pow((1.1), BuildLevel)) * (0.1 * BuildLevelFactor) ', 
		'energy'    : '   (30 * BuildLevel * Math.pow((1.05 + 0.01 * EnergyTech), BuildLevel)) * (0.1 * BuildLevelFactor) '
	}, 
	'solar_satellite' : {
		'metal'     : '   0 ',
		'crystal'   : '   0 ', 
		'deuterium' : '   0 ',
		'energy'    : '  ((BuildTemp / 4) + 20) * BuildLevel * (0.1 * BuildLevelFactor) '
	}
};

var reslist_build = {
	'metal_mine':'1',
	'crystal_mine':'1',
	'deuterium_synthesizer':'1',
	'solar_plant':'1',
	'fusion_reactor':'1',
	'robotics_factory':'1',
	'nanite_factory':'1',
	'shipyard':'1',
	'metal_storage':'1',
	'crystal_storage':'1',
	'deuterium_storage':'1',
	'research_lab':'1',
	'terraformer':'1',
	'moon_base':'1',
	'sensor_phalanx':'1',
	'jump_gate':'1',
	'missile_silo':'1'
};
var reslist_build_planet = {
	'metal_mine':'1',
	'crystal_mine':'1',
	'deuterium_synthesizer':'1',
	'solar_plant':'1',
	'fusion_reactor':'1',
	'robotics_factory':'1',
	'nanite_factory':'1',
	'shipyard':'1',
	'metal_storage':'1',
	'crystal_storage':'1',
	'deuterium_storage':'1',
	'research_lab':'1',
	'terraformer':'1',
	'missile_silo':'1'
};
var reslist_build_moon = {
	'jump_gate':'1',
	'moon_base':'1',
	'shipyard':'1',
	'robotics_factory':'1',
	'sensor_phalanx':'1'
};


var reslist_tech = {
	'espionage_tech':'1',
	'computer_tech':'1',
	'weapons_tech':'1',
	'shielding_tech':'1',
	'armour_tech':'1',
	'energy_tech':'1',
	'hyperspace_tech':'1',
	'combustion_drive_tech':'1',
	'impulse_drive_tech':'1',
	'hyperspace_drive_tech':'1',
	'laser_tech':'1',
	'ion_tech':'1',
	'plasma_tech':'1',
	'intergalactic_research_tech':'1',
	'astrophysics_tech':'1',
	'graviton_tech':'1'
};

var reslist_battle = {	
	'small_cargo':'1',
	'large_cargo':'1',
	'light_fighter':'1',
	'heavy_fighter':'1',
	'cruiser':'1',
	'battleship':'1',
	'colony_ship':'1',
	'recycler':'1',
	'espionage_probe':'1',
	'bomber':'1',
	'solar_satellite':'1',
	'destroyer':'1',
	'deathstar':'1',
	'battlecruiser':'1',
	'rocket_launcher':'1',
	'light_laser':'1',
	'heavy_laser':'1',
	'gauss_cannon':'1',
	'ion_cannon':'1',
	'plasma_cannon':'1',
	'small_shield_dome':'1',
	'large_shield_dome':'1',
	'anti_ballistic_missiles':'1',
	'interplanetary_missiles':'1'
};


var reslist_fleet = {	
	'small_cargo':'1',
	'large_cargo':'1',
	'light_fighter':'1',
	'heavy_fighter':'1',
	'cruiser':'1',
	'battleship':'1',
	'colony_ship':'1',
	'recycler':'1',
	'espionage_probe':'1',
	'bomber':'1',
	'solar_satellite':'1',
	'destroyer':'1',
	'deathstar':'1',
	'battlecruiser':'1'
};	
var reslist_defense = {
	'rocket_launcher':'1',
	'light_laser':'1',
	'heavy_laser':'1',
	'gauss_cannon':'1',
	'ion_cannon':'1',
	'plasma_cannon':'1',
	'small_shield_dome':'1',
	'large_shield_dome':'1',
	'anti_ballistic_missiles':'1',
	'interplanetary_missiles':'1'
};
var reslist_battle_defense  = { 
	'rocket_launcher':'1',
	'light_laser':'1',
	'heavy_laser':'1',
	'gauss_cannon':'1',
	'ion_cannon':'1',
	'plasma_cannon':'1',
	'small_shield_dome':'1',
	'large_shield_dome':'1'
};
var reslist_officers = {
	'off_geologist':'1',
	'off_scientist':'1',
	'off_engineer':'1',
	'off_general':'1',
	'off_admiral':'1',
	'off_energy':'1',
	'off_storer':'1',
	'off_spy':'1',
	'off_exspy':'1'
};


var reslist_production = { 
	'metal_mine':'1', 
	'crystal_mine':'1', 
	'deuterium_synthesizer':'1', 
	'solar_plant':'1', 
	'fusion_reactor':'1', 
	'solar_satellite':'1' 
};




