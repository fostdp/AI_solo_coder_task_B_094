package fem

import (
	"fmt"
	"math"
)

type FEMEngine struct {
	NX, NY    int
	Lx, Ly    float64
	Thickness []float64
	E, Nu, Rho float64
}

func NewFEMEngine(nx, ny int, lx, ly float64, thickness []float64, e, nu, rho float64) *FEMEngine {
	return &FEMEngine{
		NX:        nx,
		NY:        ny,
		Lx:        lx,
		Ly:        ly,
		Thickness: thickness,
		E:         e,
		Nu:        nu,
		Rho:       rho,
	}
}

func (f *FEMEngine) Solve() (freqs []float64, modes [][][]float64, err error) {
	if f.NX < 2 || f.NY < 2 {
		return nil, nil, fmt.Errorf("mesh divisions must be >= 2, got NX=%d, NY=%d", f.NX, f.NY)
	}
	if f.Lx <= 0 || f.Ly <= 0 {
		return nil, nil, fmt.Errorf("plate dimensions must be positive, got Lx=%f, Ly=%f", f.Lx, f.Ly)
	}
	if len(f.Thickness) == 0 {
		return nil, nil, fmt.Errorf("thickness profile is empty")
	}

	numModes := 6
	freqs = make([]float64, numModes)

	avgH := f.weightedAvgThickness()

	D := f.E * math.Pow(avgH, 3) / (12.0 * (1.0 - math.Pow(f.Nu, 2)))

	modePairs := f.generateModePairs(numModes)

	for i, pair := range modePairs {
		m, n := pair[0], pair[1]
		freq := (math.Pi / 2.0) * math.Sqrt(D/(f.Rho*avgH)) *
			(math.Pow(float64(m)/f.Lx, 2) + math.Pow(float64(n)/f.Ly, 2))
		freqs[i] = freq
	}

	nx1 := f.NX + 1
	ny1 := f.NY + 1
	modes = make([][][]float64, numModes)
	for i, pair := range modePairs {
		m, n := pair[0], pair[1]
		modes[i] = make([][]float64, ny1)
		for j := 0; j < ny1; j++ {
			modes[i][j] = make([]float64, nx1)
			y := float64(j) / float64(f.NY) * f.Ly
			for k := 0; k < nx1; k++ {
				x := float64(k) / float64(f.NX) * f.Lx
				modes[i][j][k] = math.Sin(float64(m)*math.Pi*x/f.Lx) *
					math.Sin(float64(n)*math.Pi*y/f.Ly)
			}
		}
		f.applyThicknessModulation(modes[i], pair)
		f.normalizeModeShape(modes[i])
	}

	return freqs, modes, nil
}

func (f *FEMEngine) ComputeFirstFrequency() float64 {
	avgH := f.weightedAvgThickness()
	D := f.E * math.Pow(avgH, 3) / (12.0 * (1.0 - math.Pow(f.Nu, 2)))
	freq := (math.Pi / 2.0) * math.Sqrt(D/(f.Rho*avgH)) *
		(math.Pow(1.0/f.Lx, 2) + math.Pow(1.0/f.Ly, 2))
	return freq
}

func (f *FEMEngine) ComputeFrequencySensitivity(hi float64) float64 {
	if hi <= 0 {
		return 0
	}
	return -3.0 / (2.0 * hi)
}

func (f *FEMEngine) weightedAvgThickness() float64 {
	if len(f.Thickness) == 0 {
		return 0.01
	}
	var sum, weightSum float64
	for i, h := range f.Thickness {
		w := 1.0 + 0.5*math.Sin(math.Pi*float64(i)/float64(len(f.Thickness)-1))
		sum += h * w
		weightSum += w
	}
	if weightSum == 0 {
		return f.Thickness[0]
	}
	return sum / weightSum
}

func (f *FEMEngine) generateModePairs(numModes int) [][2]int {
	var pairs [][2]int
	seen := make(map[[2]int]bool)
	maxOrder := 10

	for sum := 2; sum <= maxOrder*2 && len(pairs) < numModes; sum++ {
		for m := 1; m <= maxOrder && m < sum; m++ {
			n := sum - m
			if n < 1 || n > maxOrder {
				continue
			}
			key := [2]int{m, n}
			if !seen[key] {
				seen[key] = true
				pairs = append(pairs, key)
			}
			if len(pairs) >= numModes {
				break
			}
		}
	}

	for len(pairs) < numModes {
		m := len(pairs) + 1
		pairs = append(pairs, [2]int{m, 1})
	}

	return pairs[:numModes]
}

func (f *FEMEngine) applyThicknessModulation(mode [][]float64, pair [2]int) {
	if len(f.Thickness) <= 1 {
		return
	}

	ny1 := len(mode)
	if ny1 == 0 {
		return
	}
	nx1 := len(mode[0])
	if nx1 == 0 {
		return
	}

	avgH := f.weightedAvgThickness()
	if avgH == 0 {
		return
	}

	for j := 0; j < ny1; j++ {
		for k := 0; k < nx1; k++ {
			idx := j * nx1 + k
			if idx >= len(f.Thickness) {
				idx = len(f.Thickness) - 1
			}
			hLocal := f.Thickness[idx]
			thicknessRatio := hLocal / avgH
			modulation := 1.0 / math.Sqrt(thicknessRatio)
			mode[j][k] *= modulation
		}
	}
}

func (f *FEMEngine) normalizeModeShape(mode [][]float64) {
	var maxVal float64
	for _, row := range mode {
		for _, v := range row {
			av := math.Abs(v)
			if av > maxVal {
				maxVal = av
			}
		}
	}
	if maxVal > 0 {
		for i, row := range mode {
			for j := range row {
				mode[i][j] /= maxVal
			}
		}
	}
}
