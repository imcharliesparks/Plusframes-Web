import CombosTable from '@/components/Combo Builder/CombosTable'
import { characterIdMappingsByGame, characterDisplayNameMappingsByGame } from '@/shared/constants'
import { Combo, Games, Move } from '@/shared/types'
import { fetchCombosByMoveId, fetchMovesByCharacterId } from '@/shared/utils'
import { NextPageContext } from 'next'
import Link from 'next/link'
import React from 'react'

type ComboPageServerSideProps = {
	characterName: string
	combos: Combo[]
	error?: any
}

// TODO: Implement when we have a combos by character endpoint
const CombosPage = ({ characterName }: ComboPageServerSideProps) => {
	return (
		<div>
			<div className="text-sm breadcrumbs ml-6 mt-5">
				<ul>
					<li>
						<Link href="/app">Home</Link>
					</li>
					<li>
						<Link href="/app/combo-builder">Combo Builder</Link>
					</li>
					<li>
						<Link href={`/app/combo-builder/SF6/${characterName}`}>{characterName}</Link>
					</li>
					<li>Combos</li>
				</ul>
			</div>
			{/* TODO: Hydrate with actual combos values */}
			<CombosTable />
		</div>
	)
}

export default CombosPage

export const getServerSideProps = async (context: NextPageContext) => {
	try {
		const character = context.query.character as string
		const characterId = characterIdMappingsByGame.SF6[character]
		const characterName = characterDisplayNameMappingsByGame.SF6[characterId]
		// TODO: Replace with a combos by character ID method
		const combos: Combo[] = await fetchCombosByMoveId('518', Games.SF6)

		console.log('combos', combos)
		return {
			props: {
				characterName,
				combos: combos,
				error: null
			}
		}
	} catch (error) {
		// TODO: Add toasting on errors here
		console.error(`An error occured fetching move data`, error)
		return {
			props: {
				characterName: 'null',
				combos: [],
				error
			}
		}
	}
}
