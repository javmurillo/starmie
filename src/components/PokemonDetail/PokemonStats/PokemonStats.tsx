import { FC, ReactElement } from 'react'
import { ChartOptions } from 'chart.js'
import { Radar } from 'react-chartjs-2'

import { IPokemon } from '../../../interfaces/IPokemon'
import getColor from '../../../utils/getColor'

interface PokemonStatsProps {
  pokemon: IPokemon
  totalPokemons: number
}

const PokemonStats: FC<PokemonStatsProps> = ({
  pokemon,
  totalPokemons,
}): ReactElement => {
  const RANK_RATIO = 1 / totalPokemons
  const BACKGROUND_COLOR = `rgba(${getColor(
    pokemon.types[0].type.name,
    false
  )}, 0.2)`
  const BORDER_COLOR = `rgba(${getColor(pokemon.types[0].type.name, false)}, 1)`
  const BORDER_WIDTH = 1

  const data = {
    labels: ['HP', 'Attack', 'Defense', 'Speed', 'Sp. Defense', 'Sp. Attack'],
    datasets: [
      {
        label: 'Rank',
        data: [
          1 - (pokemon.stats.hp.rank - 1) * RANK_RATIO,
          1 - (pokemon.stats.attack.rank - 1) * RANK_RATIO,
          1 - (pokemon.stats.defense.rank - 1) * RANK_RATIO,
          1 - (pokemon.stats.speed.rank - 1) * RANK_RATIO,
          1 - (pokemon.stats.specialDefense.rank - 1) * RANK_RATIO,
          1 - (pokemon.stats.specialAttack.rank - 1) * RANK_RATIO,
        ],
        backgroundColor: BACKGROUND_COLOR,
        borderColor: BORDER_COLOR,
        borderWidth: BORDER_WIDTH,
      },
    ],
  }

  const options: ChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: ${(
              (1 - ctx.parsed.r) / RANK_RATIO +
              1
            ).toFixed(0)}`,
        },
      },
    },
    scales: {
      r: {
        ticks: {
          display: false,
        },
        grid: {
          color: 'rgba(169, 169, 169, 0.1)',
        },
        min: RANK_RATIO,
        max: 1,
      },
    },
  }

  return (
    <div>
      <Radar data={data} options={options} width={400} height={400} />
    </div>
  )
}

export default PokemonStats
