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
