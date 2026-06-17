package model

type Stone struct {
	ID               int       `json:"id"`
	Name             string    `json:"name"`
	TargetPitch      string    `json:"target_pitch"`
	TargetFreq       float64   `json:"target_freq"`
	Length           float64   `json:"length"`
	Width            float64   `json:"width"`
	ThicknessProfile []float64 `json:"thickness_profile"`
	Density          float64   `json:"density"`
	Material         string    `json:"material"`
	CreatedAt        string    `json:"created_at"`
	UpdatedAt        string    `json:"updated_at"`
}

type SensorReading struct {
	Time           string             `json:"time"`
	StoneID        int                `json:"stone_id"`
	Frequency      float64            `json:"frequency"`
	CentsDeviation float64            `json:"cents_deviation"`
	Spectrum       []float64          `json:"spectrum"`
	Dimensions     map[string]float64 `json:"dimensions"`
	DensityMap     []float64          `json:"density_map"`
}

type SimulationResult struct {
	ID           int            `json:"id"`
	StoneID      int            `json:"stone_id"`
	NaturalFreqs []float64      `json:"natural_freqs"`
	ModeShapes   [][][]float64  `json:"mode_shapes"`
	MeshInfo     map[string]int `json:"mesh_info"`
	CreatedAt    string         `json:"created_at"`
}

type OptimizationRecord struct {
	ID                 int       `json:"id"`
	StoneID            int       `json:"stone_id"`
	TargetFreq         float64   `json:"target_freq"`
	InitialFreq        float64   `json:"initial_freq"`
	OptimizedFreq      float64   `json:"optimized_freq"`
	ThicknessBefore    []float64 `json:"thickness_before"`
	ThicknessAfter     []float64 `json:"thickness_after"`
	Iterations         int       `json:"iterations"`
	ConvergenceHistory []float64 `json:"convergence_history"`
	CreatedAt          string    `json:"created_at"`
}

type Alert struct {
	ID             int     `json:"id"`
	StoneID        int     `json:"stone_id"`
	AlertType      string  `json:"alert_type"`
	CentsDeviation float64 `json:"cents_deviation"`
	Message        string  `json:"message"`
	CreatedAt      string  `json:"created_at"`
}

type WSMessage struct {
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}

type SimulationRequest struct {
	StoneID    int     `json:"stone_id"`
	MeshNX     int     `json:"mesh_nx"`
	MeshNY     int     `json:"mesh_ny"`
	ElasticMod float64 `json:"elastic_mod"`
	Poisson    float64 `json:"poisson"`
}

type OptimizationRequest struct {
	StoneID      int     `json:"stone_id"`
	TargetFreq   float64 `json:"target_freq"`
	LearningRate float64 `json:"learning_rate"`
	MaxIter      int     `json:"max_iter"`
	HMin         float64 `json:"h_min"`
	HMax         float64 `json:"h_max"`
}

type MaterialTimbre struct {
	MaterialName   string  `json:"material_name"`
	ChineseName    string  `json:"chinese_name"`
	Brightness     float64 `json:"brightness"`
	Warmth         float64 `json:"warmth"`
	DecayTime      float64 `json:"decay_time"`
	HarmonicRich   float64 `json:"harmonic_richness"`
	AttackTime     float64 `json:"attack_time"`
	SustainLevel   float64 `json:"sustain_level"`
	ReleaseTime    float64 `json:"release_time"`
}

type MaterialComparison struct {
	StoneID       int              `json:"stone_id"`
	StoneName     string           `json:"stone_name"`
	Materials     []string         `json:"materials"`
	Frequencies   map[string][]float64 `json:"frequencies"`
	Spectrums     map[string][]float64 `json:"spectrums"`
	Timbres       map[string]MaterialTimbre `json:"timbres"`
	TargetFreq    float64          `json:"target_freq"`
	Comparison    map[string]map[string]float64 `json:"comparison"`
}

type EraComparisonRequest struct {
	StoneID        int     `json:"stone_id"`
	IncludeModern  bool    `json:"include_modern"`
	ModernType     string  `json:"modern_type"`
}

type EraInstrument struct {
	Type           string  `json:"type"`
	Name           string  `json:"name"`
	Era            string  `json:"era"`
	Material       string  `json:"material"`
	TargetFreq     float64 `json:"target_freq"`
	ActualFreq     float64 `json:"actual_freq"`
	Length         float64 `json:"length"`
	Width          float64 `json:"width"`
	Thickness      float64 `json:"thickness"`
	Density        float64 `json:"density"`
	ElasticMod     float64 `json:"elastic_mod"`
	Poisson        float64 `json:"poisson"`
}

type EraComparison struct {
	Ancient       EraInstrument   `json:"ancient"`
	Modern        EraInstrument   `json:"modern"`
	FreqResponse  map[string][]float64 `json:"frequency_response"`
	DecayCurves   map[string][]float64 `json:"decay_curves"`
	SpectrumComp  map[string][]float64 `json:"spectrum_comparison"`
	TimbreDiff    map[string]float64 `json:"timbre_difference"`
	Standard      string  `json:"reference_standard"`
	RefFreq       float64 `json:"reference_frequency"`
}

type GlockenspielConfig struct {
	Type         string  `json:"type"`
	Material     string  `json:"material"`
	ElasticMod   float64 `json:"elastic_mod"`
	Poisson      float64 `json:"poisson"`
	Density      float64 `json:"density"`
	LengthRatio  float64 `json:"length_ratio"`
	Thickness    float64 `json:"thickness"`
	Width        float64 `json:"width"`
}

type EnsembleStone struct {
	StoneID    int       `json:"stone_id"`
	Name       string    `json:"name"`
	Frequency  float64   `json:"frequency"`
	PositionX  float64   `json:"position_x"`
	PositionY  float64   `json:"position_y"`
	Amplitude  float64   `json:"amplitude"`
	Phase      float64   `json:"phase"`
	Active     bool      `json:"active"`
}

type EnsembleRequest struct {
	Stones       []EnsembleStone `json:"stones"`
	GridSize     int             `json:"grid_size"`
	FieldWidth   float64         `json:"field_width"`
	FieldHeight  float64         `json:"field_height"`
	Frequency    float64         `json:"frequency"`
}

type EnsembleResult struct {
	GridSize    int             `json:"grid_size"`
	FieldWidth  float64         `json:"field_width"`
	FieldHeight float64         `json:"field_height"`
	Pressure    [][]float64     `json:"pressure_field"`
	Intensity   [][]float64     `json:"intensity_field"`
	Nodes       [][2]float64    `json:"nodes"`
	Antinodes   [][2]float64    `json:"antinodes"`
	Stones      []EnsembleStone `json:"stones"`
	MaxPressure float64         `json:"max_pressure"`
	MinPressure float64         `json:"min_pressure"`
}

type StrikeParams struct {
	Frequency    float64 `json:"frequency"`
	AttackTime   float64 `json:"attack_time"`
	DecayTime    float64 `json:"decay_time"`
	SustainLevel float64 `json:"sustain_level"`
	ReleaseTime  float64 `json:"release_time"`
	Harmonics    []float64 `json:"harmonics"`
	Inharmonicity float64 `json:"inharmonicity"`
	Timbre       string  `json:"timbre"`
}

type MusicNote struct {
	Pitch       string  `json:"pitch"`
	Frequency   float64 `json:"frequency"`
	Duration    float64 `json:"duration"`
	StartTime   float64 `json:"start_time"`
	Velocity    float64 `json:"velocity"`
	StoneID     int     `json:"stone_id,omitempty"`
}

type AncientScore struct {
	ID          string       `json:"id"`
	Name        string       `json:"name"`
	Era         string       `json:"era"`
	Tempo       int          `json:"tempo"`
	TimeSig     string       `json:"time_signature"`
	Notes       []MusicNote  `json:"notes"`
	Description string       `json:"description"`
	Difficulty  string       `json:"difficulty"`
}

type PlaybackState struct {
	IsPlaying   bool    `json:"is_playing"`
	CurrentTime float64 `json:"current_time"`
	TotalTime   float64 `json:"total_time"`
	Tempo       int     `json:"tempo"`
	ScoreID     string  `json:"score_id"`
}

type MaterialComparisonRequest struct {
	StoneID   int      `json:"stone_id"`
	Materials []string `json:"materials"`
}
